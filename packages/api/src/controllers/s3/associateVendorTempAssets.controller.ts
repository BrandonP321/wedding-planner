import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../services";
import { Controller, S3Utils } from "../../utils";
import { AssociateVendorTempAssetsRequest } from "@wedding-planner/shared/api/requests/s3/associateVendorTempAssets.request";
import db, { sequelize } from "../../models";
import { last } from "lodash";
import { AuthedVendorResLocals } from "../../middleware/GetAuthedVendor.middleware";
import { Op, Transaction } from "sequelize";

type ReqBody = AssociateVendorTempAssetsRequest.ReqBody;

const controller = new Controller<
  ReqBody,
  AssociateVendorTempAssetsRequest.ResBody,
  AuthedVendorResLocals,
  typeof AssociateVendorTempAssetsRequest.Errors
>(AssociateVendorTempAssetsRequest.Errors);

/**
 * Renames S3 objects to remove 'temp/' prefix.
 * Then associates those assets with the authenticated vendor
 */
export const AssociateVendorTempAssetsController = controller.handler(
  async (req, res, errors) => {
    const { assets } = req.body;
    const { vendorId } = res.locals;

    // Find all existing assets for this vendor, these will be deleted
    const imagesToDelete = await db.VendorImageAsset.findAll({
      where: { vendorId },
    });

    const idsToDelete = imagesToDelete.map((i) => i.dataValues.id);

    await sequelize.transaction(async (transaction) => {
      // Bulk create assets in DB with isLive set to false
      await db.VendorImageAsset.bulkCreate(
        assets?.map((a, i) => {
          const newObjectKey = S3Utils.removeObjectKeyTempPrefix(a.objectKey);

          return {
            isLive: false,
            isShowcaseImage: a.isInShowcase,
            name: last(newObjectKey.split("/")) ?? "",
            order: i + 1,
            s3Bucket: S3Utils.assetsBucket,
            s3ObjectKey: newObjectKey,
            vendorId,
            showcaseOrder: a.showcaseOrder,
          };
        }),
        { transaction }
      );

      // Copy objects to new key without 'temp/' prefix
      await copyObjectsToNewKeys(assets.map(({ objectKey }) => objectKey));

      // Bulk delete old assets and mark new assets as live
      await Promise.all([
        markAssetsAsLive(idsToDelete, transaction),
        db.VendorImageAsset.destroy({
          where: { id: { [Op.in]: idsToDelete } },
          transaction,
        }),
      ]);
    });

    // Delete old temp objects asynchonously.  We don't care if this
    // fails since lifecycle rules will delete them eventually.
    try {
      const tempAssetObjectKeys = assets.map(({ objectKey }) => objectKey);
      const oldAssetObjectKeys = imagesToDelete.map(
        (img) => img.dataValues.s3ObjectKey
      );

      deleteOldObjects([...tempAssetObjectKeys, ...oldAssetObjectKeys]);
    } catch (err) {
      // TODO: Log this error so we can identify if it's a problem
      // noop
    }

    return res
      .json({
        // TODO: Decide if this is worth keeping
        unsuccessfulAssociations: [],
      })
      .end();
  }
);

const copyObjectsToNewKeys = async (objectKeys: string[]) => {
  await Promise.all(
    objectKeys.map(async (tempObjectKey) => {
      const encodedTempObjectKey = encodeURIComponent(tempObjectKey);
      const newObjectKey = S3Utils.removeObjectKeyTempPrefix(tempObjectKey);

      const copyCommand = new CopyObjectCommand({
        Bucket: S3Utils.assetsBucket,
        CopySource: `${S3Utils.assetsBucket}/${encodedTempObjectKey}`,
        Key: newObjectKey,
      });

      await s3.send(copyCommand);
    })
  );
};

const markAssetsAsLive = async (
  idsBeingDeleted: number[],
  transaction: Transaction
) => {
  await db.VendorImageAsset.update(
    { isLive: true },
    { where: { id: { [Op.notIn]: idsBeingDeleted } }, transaction }
  );
};

const deleteOldObjects = (objectKeys: string[]) => {
  Promise.all(
    objectKeys.map(async (Key) => {
      const command = new DeleteObjectCommand({
        Bucket: S3Utils.assetsBucket,
        Key,
      });

      await s3.send(command);
    })
  ).catch((err) => {
    // TODO: Log this error
    console.error(err);
  });
};
