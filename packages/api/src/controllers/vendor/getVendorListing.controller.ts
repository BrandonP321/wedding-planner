import { Controller } from "../../utils/ControllerUtils";
import { GetVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/getVendorListing.request";
import db from "../../models";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";

const controller = new Controller<
  GetVendorListingRequest.ReqBody,
  GetVendorListingRequest.ResBody,
  {},
  typeof GetVendorListingRequest.Errors
>(GetVendorListingRequest.Errors);

export const GetVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendorId } = req.body;

    const vendor = await db.Vendor.findOne({
      where: { id: vendorId },
      attributes: db.Vendor.includedAttributes,
      include: [
        db.MainChoice.populatedIncludable,
        db.VendorImageAsset.includable,
        db.VendorImageAsset.showcaseIncludable,
        db.Link.includable,
        db.Link.socialLinksIncludable,
      ],
    });

    if (!vendor) {
      return errors.VendorNotFound();
    }

    const vendorJSON: VendorModel.APIResponse.Populated =
      vendor.toJSON() as any;

    return res.json({ vendor: vendorJSON }).end();
  }
);
