import { Controller } from "../../utils/ControllerUtils";
import { UpdateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/updateVendorListing.request";
import db, { sequelize } from "../../models";
import { JWTResLocals, VendorUtils } from "../../utils";

const controller = new Controller<
  UpdateVendorListingRequest.ReqBody,
  UpdateVendorListingRequest.ResBody,
  JWTResLocals,
  typeof UpdateVendorListingRequest.Errors
>(UpdateVendorListingRequest.Errors);

export const UpdateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendor, location } = req.body;
    const { ownerId } = res.locals;

    const vendorToUpdate = await db.Vendor.findOne({ where: { ownerId } });

    if (!vendorToUpdate) {
      return errors.VendorNotFound();
    } else if (!vendorToUpdate.validateOwnership(ownerId)) {
      return errors.UnauthorizedAccess();
    }

    const vendorId = vendorToUpdate.dataValues.id;

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
