import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams =
  ModelTypes.ModelCreationOrUpdateParams<VendorModel.APIResponse.Unpopulated>;

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
