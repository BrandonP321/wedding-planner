import { Vendor } from "@wedding-planner/shared/common/types";
import db from "../models";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { LinkModel } from "@wedding-planner/shared/api/models/Link";
import { Transaction } from "sequelize";
import { locationGeographyUtils } from "./LocationGeographyUtils";

export class VendorUtils {
  public static getVendorCreationOrUpdateParams = (
    vendor: VendorModel.CreationParams,
    ownerId: number,
    location: [number, number]
  ): VendorModel.Base => ({
    ownerId,
    name: vendor.name,
    description: vendor.description,
    streetAddress: vendor.streetAddress,
    lat: vendor.lat,
    lng: vendor.lng,
    city: vendor.city,
    state: vendor.state,
    zipCode: vendor.zipCode,
    vendorType: vendor.vendorType,
    serviceableRadius: Math.round(
      locationGeographyUtils.milesToMeters(vendor.serviceableRadius)
    ),
    locationGeometry: {
      type: "Point",
      coordinates: location,
      crs: { properties: { name: "EPSG:4326" }, type: "name" },
    },
  });

  public static createVendorLinks = async (
    links: LinkModel.CreationParams[],
    ownerId: number,
    vendorId: number,
    transaction: Transaction
  ) => {
    await Promise.all(
      links.map(async (link) => {
        return await db.Link.create(
          {
            ownerId,
            vendorId,
            label: link.label,
            type: link.type,
            url: link.url,
          },
          { transaction }
        );
      })
    );
  };
}
