import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  VendorModel.CreationAttributes & { id?: number }
>;

export default class Vendor extends BaseModel<
  VendorModel.Attributes,
  VendorModel.Base
> {
  public static includedAttributes: VendorModel.IncludedAttributes[] = [
    "city",
    "description",
    "id",
    "name",
  ];

  public static createOrUpdate = (params: CreationOrUpdateParams) => {
    return this._createOrUpdate(params);
  };
}

export const tempVendorInit = (sequelize: Sequelize) =>
  Vendor.init(
    {
      ...BaseModel.SchemaAttributes,
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      description: DataTypes.STRING,
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
      ],
    }
  );
