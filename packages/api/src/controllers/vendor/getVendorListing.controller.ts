import { Controller } from "../../utils/ControllerUtils";
import { GetVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/getVendorListing.request";
import db from "../../models";

const controller = new Controller<
  GetVendorListingRequest.ReqBody,
  GetVendorListingRequest.ResBody,
  {},
  typeof GetVendorListingRequest.Errors
>(GetVendorListingRequest.Errors);

export const GetVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendorId } = req.body;

    const vendor = await db.Vendor.findPopulatedById(vendorId);

    if (!vendor) {
      return errors.VendorNotFound();
    }

    const vendorJSON = vendor.toPopulatedJSON();

    return res.json({ vendor: vendorJSON }).end();
  }
);
