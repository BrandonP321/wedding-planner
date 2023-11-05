import { DataTypes, IncludeOptions, Op, Sequelize } from "sequelize";
import { LinkModel } from "@wedding-planner/shared/api/models/Link";
import {
  DefaultModel,
  SocialMediaPlatformsList,
} from "@wedding-planner/shared/common/types";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  LinkModel.CreationOrUpdateParams,
  "vendorId"
>;

export default class Link extends BaseModel<
  LinkModel.Attributes,
  LinkModel.Base
> {
  public static includedAttributes: LinkModel.IncludedAttributes[] = [
    "id",
    "label",
    "type",
  ];

  public static includable: IncludeOptions = {
    model: Link,
    as: LinkModel.PopulatedName,
    required: false,
    attributes: this.includedAttributes,
  };

  public static socialLinksIncludable: IncludeOptions = {
    ...this.includable,
    as: LinkModel.SocialLinksPopulatedName,
    where: {
      type: {
        [Op.in]: SocialMediaPlatformsList,
      },
    },
  };

  public static getCreateAttributesJSON = ({
    vendorId,
    model,
  }: CreationOrUpdateParams): LinkModel.Base => ({
    ...model,
    vendorId,
  });

  public static createOrUpdate = (params: CreationOrUpdateParams) => {
    return this._createOrUpdate(params);
  };
}

export const tempLinkInit = (sequelize: Sequelize) =>
  Link.init(
    {
      ...BaseModel.SchemaAttributes,
      vendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: VendorModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      label: DataTypes.STRING,
      type: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: LinkModel.Name,
      tableName: LinkModel.Name,
    }
  );
