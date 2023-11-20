import { Controller } from "../../utils/ControllerUtils";
import { GetAuthedVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/getAuthedVendorListing.request";
import db from "../../models";
import { JWTResLocals } from "../../utils";

const controller = new Controller<
  GetAuthedVendorListingRequest.ReqBody,
  GetAuthedVendorListingRequest.ResBody,
  JWTResLocals,
  typeof GetAuthedVendorListingRequest.Errors
>(GetAuthedVendorListingRequest.Errors);

export const GetAuthedVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { ownerId } = res.locals;

    const vendor = await db.Vendor.findPopulatedByOwnerId(ownerId);

    if (!vendor) {
      return errors.VendorNotFound();
    }

    const vendorJSON = vendor.toPopulatedJSON();

    return res.json({ vendor: vendorJSON }).end();
  }
);
