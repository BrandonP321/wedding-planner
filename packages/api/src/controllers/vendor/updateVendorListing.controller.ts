import { Controller } from "../../utils/ControllerUtils";
import { UpdateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/updateVendorListing.request";
import db, { sequelize } from "../../models";
import { VendorUtils } from "../../utils";
import { AuthedVendorResLocals } from "../../middleware/GetAuthedVendor.middleware";

const controller = new Controller<
  UpdateVendorListingRequest.ReqBody,
  UpdateVendorListingRequest.ResBody,
  AuthedVendorResLocals,
  typeof UpdateVendorListingRequest.Errors
>(UpdateVendorListingRequest.Errors);

export const UpdateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendor } = req.body;
    const { ownerId, vendorId, vendor: vendorToUpdate } = res.locals;

    const location: [number, number] = [vendor.lng, vendor.lat];

    await sequelize.transaction(async (transaction) => {
      await vendorToUpdate.update(
        VendorUtils.getVendorCreationOrUpdateParams(vendor, ownerId, location),
        { transaction }
      );

      // To minimize the period of time where links may be missing
      // from a listing, we will: (1) grab all existing links, (2) create all
      // links provided in the request, and (3) then delete all of the old links.
      const oldLinks = await db.Link.findAll({
        where: { vendorId, ownerId },
        transaction,
      });

      const createNewLinks = () =>
        VendorUtils.createVendorLinks(
          [...vendor.links, ...vendor.socialLinks],
          ownerId,
          vendorId,
          transaction
        );

      const deleteOldLinks = () =>
        Promise.all(
          oldLinks.map(async (link) => {
            return await link.destroy({ transaction });
          })
        );

      await Promise.all([createNewLinks(), deleteOldLinks()]);
    });

    return res.json({ vendorId }).end();
  }
);
