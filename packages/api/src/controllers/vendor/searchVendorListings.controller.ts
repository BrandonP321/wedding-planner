import { Controller } from "../../utils/ControllerUtils";
import { SearchVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/searchVendorListings.request";
import db, { sequelize } from "../../models";
import { QueryTypes } from "sequelize";
import { MapsAPIFetcher, locationGeographyUtils } from "../../utils";

const controller = new Controller<
  SearchVendorListingRequest.ReqBody,
  SearchVendorListingRequest.ResBody,
  {},
  typeof SearchVendorListingRequest.Errors
>(SearchVendorListingRequest.Errors);

const minPriceSubQuery = `
SELECT "mainChoice"."id" AS "mainChoiceId", SUM(min_price) AS "totalMinPricePerMainChoice"
FROM "mainChoice"
JOIN (
    SELECT "choiceGroup"."mainChoiceId", MIN("choice"."price") AS min_price
    FROM "choiceGroup"
    JOIN "choice" ON "choiceGroup"."id" = "choice"."choiceGroupId"
    GROUP BY "choiceGroup"."mainChoiceId", "choiceGroup"."id"
) AS min_prices_per_group ON "mainChoice"."id" = min_prices_per_group."mainChoiceId"
GROUP BY "mainChoice"."id"
`;

const requiredAttributes: string[] = [
  "traditional",
  // "photojournalistic",
  // "artistic",
  // "videography",
];

const attributeFilterSubQuery = `
SELECT "mainChoiceId"
FROM "mainChoiceAttribute"
WHERE "filterName" IN (${requiredAttributes
  .map((attr) => `'${attr}'`)
  .join(", ")})
GROUP BY "mainChoiceId"
HAVING COUNT(DISTINCT "filterName") = ${requiredAttributes.length}
`;

// TODO: Add measures to prevent SQL injection with parameterized queries
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
  MIN("MinChoicePrices"."totalMinPricePerMainChoice") AS "TotalMinPrice"
FROM 
  "vendor"
JOIN 
  "mainChoice" ON "vendor"."id" = "mainChoice"."vendorId"
JOIN 
  (${minPriceSubQuery}) AS "MinChoicePrices" ON "mainChoice"."id" = "MinChoicePrices"."mainChoiceId"
JOIN 
  (${attributeFilterSubQuery}) AS "FilteredMainChoices" ON "mainChoice"."id" = "FilteredMainChoices"."mainChoiceId"
WHERE
  ST_DWithin(
    "vendor"."locationGeometry",
    ST_GeomFromText('POINT(${lng} ${lat})', 4326),
    ${locationGeographyUtils.milesToMeters(clampedSearchRadius)}
  )
GROUP BY 
  "vendor"."id"
HAVING 
  MIN("MinChoicePrices"."totalMinPricePerMainChoice") <= 8000
`;

    const vendorsWithMinPrice = await sequelize.query(rawQuery, {
      type: QueryTypes.SELECT,
    });

    return res.json({ vendors: vendorsWithMinPrice as any }).end();
  }
);
