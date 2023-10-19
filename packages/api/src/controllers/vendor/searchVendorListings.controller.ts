import { Controller } from "../../utils/ControllerUtils";
import { SearchVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/searchVendorListings.request";
import db, { sequelize } from "../../models";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { getFilteredVendors } from "../../utils/filters";
import { Sequelize } from "sequelize";
import { locationGeographyUtils } from "../../utils";
import { MapsAPIFetcher } from "@wedding-planner/shared/common";

const controller = new Controller<
  SearchVendorListingRequest.ReqBody,
  SearchVendorListingRequest.ResBody,
  {},
  typeof SearchVendorListingRequest.Errors
>(SearchVendorListingRequest.Errors);

export const SearchVendorListingsController = controller.handler(
  async (req, res, errors) => {
    const filters = req.body;
    const { locationPlaceId, distanceFromLocation } = req.body;

    const { lat, lng } = await MapsAPIFetcher.getCityCoords(locationPlaceId);

    const locationPoint = sequelize.fn("ST_MakePoint", lng, lat);

    const maxSearchRadius = 50;
    const minSearchRadius = 10;

    const clampedSearchRadius = Math.max(
      Math.min(distanceFromLocation, maxSearchRadius),
      minSearchRadius
    );

    const tempVendors = await db.Vendor.findAll({
      where: Sequelize.where(
        sequelize.fn(
          "ST_DWithin",
          sequelize.col("locationGeometry"),
          locationPoint,
          locationGeographyUtils.milesToMeters(clampedSearchRadius)
        ),
        true
      ),
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
