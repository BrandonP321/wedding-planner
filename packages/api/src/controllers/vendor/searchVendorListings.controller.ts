import { Controller } from "../../utils/ControllerUtils";
import { SearchVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/searchVendorListings.request";
import db, { sequelize } from "../../models";
import { DataTypes, QueryTypes, Sequelize } from "sequelize";
import MainChoice from "../../models/mainChoice/mainChoice.model";
import { MapsAPIFetcher, locationGeographyUtils } from "../../utils";

const controller = new Controller<
  SearchVendorListingRequest.ReqBody,
  SearchVendorListingRequest.ResBody,
  {},
  typeof SearchVendorListingRequest.Errors
>(SearchVendorListingRequest.Errors);

const minPriceSubQuery = `
SELECT "mainChoiceId", SUM(min_price) AS total_min_price
FROM (
    SELECT "choiceGroup"."mainChoiceId", MIN("choice"."price") AS min_price
    FROM "choiceGroup"
    JOIN "choice" ON "choiceGroup"."id" = "choice"."choiceGroupId"
    GROUP BY "choiceGroup"."mainChoiceId", "choiceGroup"."id"
) AS min_prices_per_group
GROUP BY "mainChoiceId"
`;

// const rawQuery = `
// SELECT
//   "vendor"."id",
//   "vendor"."name",
//   SUM("MinChoicePrices"."total_min_price") AS "TotalMinPrice"
// FROM
//   "vendor"
// JOIN
//   "mainChoice" ON "vendor"."id" = "mainChoice"."vendorId"
// JOIN
//   (${minPriceSubQuery}) AS "MinChoicePrices" ON "mainChoice"."id" = "MinChoicePrices"."mainChoiceId"
// GROUP BY
//   "vendor"."id"
// HAVING
//   SUM("MinChoicePrices"."total_min_price") <= 5000
// `;

export const SearchVendorListingsController = controller.handler(
  async (req, res, errors) => {
    const filters = req.body;
    const { locationPlaceId, distanceFromLocation } = req.body;

    const { lat, lng } = await MapsAPIFetcher.getCityCoords(locationPlaceId);

    const maxSearchRadius = 50;
    const minSearchRadius = 10;

    const clampedSearchRadius = Math.max(
      Math.min(distanceFromLocation, maxSearchRadius),
      minSearchRadius
    );

    const rawQuery = `
SELECT 
  "vendor"."id", 
  "vendor"."name", 
  SUM("MinChoicePrices"."total_min_price") AS "TotalMinPrice"
FROM 
  "vendor"
JOIN 
  "mainChoice" ON "vendor"."id" = "mainChoice"."vendorId"
JOIN 
  (${minPriceSubQuery}) AS "MinChoicePrices" ON "mainChoice"."id" = "MinChoicePrices"."mainChoiceId"
WHERE
  ST_DWithin(
    "vendor"."locationGeometry",
    ST_GeomFromText('POINT(${lng} ${lat})', 4326),
    ${locationGeographyUtils.milesToMeters(clampedSearchRadius)}
  )
GROUP BY 
  "vendor"."id"
HAVING 
  SUM("MinChoicePrices"."total_min_price") <= 8000
`;

    const vendorsWithMinPrice = await sequelize.query(rawQuery, {
      type: QueryTypes.SELECT,
    });

    return res.json({ vendors: vendorsWithMinPrice as any }).end();
  }
);
