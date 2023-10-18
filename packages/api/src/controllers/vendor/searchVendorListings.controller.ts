import { Controller } from "../../utils/ControllerUtils";
import { SearchVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/searchVendorListings.request";
import db, { sequelize } from "../../models";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { getFilteredVendors } from "../../utils/filters";

const controller = new Controller<
  SearchVendorListingRequest.ReqBody,
  SearchVendorListingRequest.ResBody,
  {},
  typeof SearchVendorListingRequest.Errors
>(SearchVendorListingRequest.Errors);

export const SearchVendorListingsController = controller.handler(
  async (req, res, errors) => {
    const filters = req.body;

    // TODO: Implement location based filtering
    const tempVendors = await db.Vendor.findAll({
      attributes: db.Vendor.includedAttributes,
      include: db.MainChoice.populatedIncludable,
    });

    const vendorJSONs: VendorModel.APIResponse.Populated[] = tempVendors.map(
      (v) => v.toJSON() as any
    );

    const filteredVendors = getFilteredVendors(vendorJSONs, filters);

    return res.json({ vendors: filteredVendors }).end();
  }
);
