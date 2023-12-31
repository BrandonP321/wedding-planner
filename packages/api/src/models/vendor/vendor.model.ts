import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { DataTypes, FindOptions, Sequelize } from "sequelize";
import db, { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";
import { VendorAccountModel } from "@wedding-planner/shared/api/models/vendorAccount";
import MainChoice from "../mainChoice/mainChoice.model";
import VendorImageAsset from "../vendorImageAsset/vendorImageAsset.model";
import Link from "../link/link.model";
import { locationGeographyUtils } from "../../utils";
import { values } from "lodash";
import { Vendor as V } from "@wedding-planner/shared/common/types/vendor";

export default class Vendor extends BaseModel<
  VendorModel.Attributes,
  VendorModel.Base
> {
  public static includedAttributes: VendorModel.IncludedAttributes[] = [
    "city",
    "state",
    "streetAddress",
    "zipCode",
    "description",
    "id",
    "lat",
    "lng",
    "name",
    "ownerId",
    "serviceableRadius",
    "vendorType",
  ];

  public static defaultFindOptions: FindOptions<VendorModel.Attributes> = {
    attributes: this.includedAttributes,
    include: [
      MainChoice.populatedIncludable,
      VendorImageAsset.includable,
      VendorImageAsset.showcaseIncludable,
      Link.includable,
      Link.socialLinksIncludable,
    ],
  };

  public static findPopulatedById = (id: number) =>
    db.Vendor.findOne({ ...this.defaultFindOptions, where: { id } });

  public static findPopulatedByOwnerId = (ownerId: number) =>
    db.Vendor.findOne({ ...this.defaultFindOptions, where: { ownerId } });

  public toPopulatedJSON = (): VendorModel.APIResponse.Populated => {
    const json: VendorModel.APIResponse.Populated = this.toJSON() as any;

    json.serviceableRadius = Math.round(
      locationGeographyUtils.metersToMiles(json.serviceableRadius)
    );

    return json;
  };

  public validateOwnership = (ownerId: number) => {
    return this.dataValues.ownerId === ownerId;
  };
}

export const tempVendorInit = (sequelize: Sequelize) =>
  Vendor.init(
    {
      ...BaseModel.SchemaAttributes,
      name: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      description: DataTypes.STRING,
      vendorType: DataTypes.ENUM(...values(V.VendorType)),
      serviceableRadius: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        references: {
          model: VendorAccountModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      locationGeometry: {
        type: DataTypes.GEOGRAPHY("POINT", 4326),
      },
    },
    {
      sequelize,
      modelName: VendorModel.Name,
      tableName: VendorModel.Name,
      indexes: [
        {
          name: "vendor_location_geometry_index",
          using: "gist",
          fields: ["locationGeometry"],
        },
        { fields: ["ownerId"] },
      ],
    }
  );
