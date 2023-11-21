import { CreateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/createVendorListing.request";
import { Controller } from "../../utils/ControllerUtils";
import { JWTResLocals, VendorUtils } from "../../utils";
import db, { sequelize } from "../../models";

const controller = new Controller<
  CreateVendorListingRequest.ReqBody,
  CreateVendorListingRequest.ResBody,
  JWTResLocals,
  typeof CreateVendorListingRequest.Errors
>(CreateVendorListingRequest.Errors);

export const CreateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendor: reqVendor, location } = req.body;
    const { ownerId } = res.locals;

    const existingVendor = await db.Vendor.findOne({ where: { ownerId } });

    if (existingVendor) {
      return errors.listingAlreadyExists();
    }

    const { vendorId } = await sequelize.transaction(async (transaction) => {
      const newVendor = await db.Vendor.create(
        VendorUtils.getVendorCreationOrUpdateParams(
          reqVendor,
          ownerId,
          location
        ),
        { transaction }
      );

      const vendorId = newVendor.dataValues.id;

      await VendorUtils.createVendorLinks(
        [...reqVendor.links, ...reqVendor.socialLinks],
        ownerId,
        vendorId,
        transaction
      );

      return { vendorId: newVendor.dataValues.id };
    });

    return res.json({ vendorId }).end();
  }
);
