import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { DataTypes, Model, Sequelize } from "sequelize";

export default class Vendor extends Model<
  VendorModel.Attributes,
  VendorModel.Base
> {
  public static includedAttributes: VendorModel.IncludedAttributes[] = [
    "city",
    "description",
    "id",
    "name",
  ];
}

export const tempVendorInit = (sequelize: Sequelize) =>
  Vendor.init(
    {
      ...DefaultModel.SchemaAttributes,
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: VendorModel.Name,
      tableName: VendorModel.Name,
    }
  );
