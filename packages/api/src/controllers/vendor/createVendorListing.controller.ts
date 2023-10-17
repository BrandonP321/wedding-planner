import { CreateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/createVendorListing.request";
import { Controller } from "../../utils/ControllerUtils";
import db, { sequelize } from "../../models";
import { VendorUtils } from "../../utils";

const controller = new Controller<
  CreateVendorListingRequest.ReqBody,
  CreateVendorListingRequest.ResBody,
  {},
  typeof CreateVendorListingRequest.Errors
>(CreateVendorListingRequest.Errors);

export const CreateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendor: reqVendor } = req.body;

    const { vendorId } = await VendorUtils.createOrUpdateVendor(reqVendor);

    return res.json({ vendorId }).end();
  }
);
