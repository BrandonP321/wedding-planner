import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../services";
import { Controller, S3Utils } from "../../utils";
import { AssociateVendorTempAssetsRequest } from "@wedding-planner/shared/api/requests/s3/associateVendorTempAssets.request";
import db from "../../models";
import { last } from "lodash";

const controller = new Controller<
  AssociateVendorTempAssetsRequest.ReqBody,
  AssociateVendorTempAssetsRequest.ResBody,
  {},
  typeof AssociateVendorTempAssetsRequest.Errors
>(AssociateVendorTempAssetsRequest.Errors);

/**
 * Renames S3 objects to remove 'temp/' prefix.
 * Then associates those assets with the authenticated vendor
 */
export const AssociateVendorTempAssetsController = controller.handler(
  async (req, res, errors) => {
    const { assets } = req.body;

    const tempVendorId = 1;

    // Copy objects to new key without 'temp/' prefix
    const copiedAssets = await Promise.all(
      assets.map(async ({ objectKey: tempObjectKey, order }, i) => {
        try {
          const encodedTempObjectKey = encodeURIComponent(tempObjectKey);
          const newObjectKey = S3Utils.removeObjectKeyTempPrefix(tempObjectKey);

          const copyCommand = new CopyObjectCommand({
            Bucket: S3Utils.assetsBucket,
            CopySource: `${S3Utils.assetsBucket}/${encodedTempObjectKey}`,
            Key: newObjectKey,
          });

          await s3.send(copyCommand);

          // Create image asset in DB that is associated with its vendor
          await db.VendorImageAsset.create({
            vendorId: tempVendorId,
            s3Bucket: S3Utils.assetsBucket,
            isShowcaseImage: false,
            name: last(newObjectKey.split("/")) ?? "",
            order,
            s3ObjectKey: newObjectKey,
            showcaseOrder: null,
          });

          return { objectKey: tempObjectKey, successful: true };
        } catch (err) {
          console.error(err);
          return { objectKey: tempObjectKey, successful: false };
        }
      })
    );

    // Delete old temp objects asynchonously.  We don't care if this
    // fails since lifecycle rules will delete them eventually.
    Promise.all(
      assets.map(async ({ objectKey }) => {
        const command = new DeleteObjectCommand({
          Bucket: S3Utils.assetsBucket,
          Key: objectKey,
        });

        await s3.send(command);
      })
    ).catch((err) => {
      // TODO: Log this error
      console.error(err);
    });

    return res
      .json({
        unsuccessfulAssociations: copiedAssets.filter((a) => !a.successful),
      })
      .end();
  }
);
