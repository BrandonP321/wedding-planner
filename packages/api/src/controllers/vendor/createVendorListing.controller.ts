import { CreateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/createVendorListing.request";
import { Controller } from "../../utils/ControllerUtils";
import { JWTResLocals, VendorUtils } from "../../utils";

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

    const { vendorId } = await VendorUtils.createOrUpdateVendor({
      ...reqVendor,
      ownerId,
      locationGeometry: {
        type: "Point",
        coordinates: location,
        crs: { properties: { name: "EPSG:4326" }, type: "name" },
      },
    });

    return res.json({ vendorId }).end();
  }
);
