import { Controller } from "../../utils/ControllerUtils";
import { UpdateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/updateVendorListing.request";
import db, { sequelize } from "../../models";
import { VendorUtils } from "../../utils";

const controller = new Controller<
  UpdateVendorListingRequest.ReqBody,
  UpdateVendorListingRequest.ResBody,
  {},
  typeof UpdateVendorListingRequest.Errors
>(UpdateVendorListingRequest.Errors);

export const UpdateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendor } = req.body;

    // TODO: Remove location array after testing
    const { vendorId } = await VendorUtils.createOrUpdateVendor(vendor);

    return res.json({ vendorId }).end();
  }
);
