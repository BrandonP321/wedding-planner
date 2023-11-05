import {
  DataTypes,
  IncludeOptions,
  Model,
  Sequelize,
  WhereOptions,
} from "sequelize";
import { VendorImageAssetModel } from "@wedding-planner/shared/api/models/vendorImageAsset";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  VendorImageAssetModel.CreationOrUpdateParams,
  "vendorId"
>;

export default class VendorImageAsset extends BaseModel<
  VendorImageAssetModel.Attributes,
  VendorImageAssetModel.Base
> {
  public static includedAttributes: VendorImageAssetModel.IncludedAttributes[] =
    ["id", "order", "s3Bucket", "s3ObjectKey"];

  public static showcaseIncludedAttributes: VendorImageAssetModel.ShowcaseIncludedAttributes[] =
    ["id", "s3Bucket", "s3ObjectKey", "showcaseOrder"];

  public static includable: IncludeOptions = {
    model: VendorImageAsset,
    as: VendorImageAssetModel.PopulatedName,
    required: false,
    attributes: this.includedAttributes,
  };

  public static showcaseIncludable: IncludeOptions = {
    model: VendorImageAsset,
    as: VendorImageAssetModel.ShowcasePopulatedName,
    where: {
      isShowcaseImage: true,
    } as WhereOptions<VendorImageAssetModel.Attributes>,
    required: false,
    attributes: this.showcaseIncludedAttributes,
  };

  public static getCreateAttributesJSON = ({
    vendorId,
    model,
  }: CreationOrUpdateParams): VendorImageAssetModel.Base => ({
    ...model,
    vendorId,
  });

  public static createOrUpdate = (params: CreationOrUpdateParams) => {
    return this._createOrUpdate(params);
  };
}

export const tempVendorImageAssetInit = (sequelize: Sequelize) =>
  VendorImageAsset.init(
    {
      ...BaseModel.SchemaAttributes,
      vendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: VendorModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      isShowcaseImage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      showcaseOrder: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      name: DataTypes.STRING,
      s3Bucket: DataTypes.STRING,
      s3ObjectKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: VendorImageAssetModel.Name,
      tableName: VendorImageAssetModel.Name,
    }
  );
