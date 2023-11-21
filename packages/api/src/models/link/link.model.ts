import { DataTypes, IncludeOptions, Op, Sequelize } from "sequelize";
import { LinkModel } from "@wedding-planner/shared/api/models/Link";
import {
  DefaultModel,
  SocialMediaPlatformsList,
} from "@wedding-planner/shared/common/types";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { BaseModel } from "../BaseModel";
import { VendorAccountModel } from "@wedding-planner/shared/api/models/vendorAccount";

export default class Link extends BaseModel<
  LinkModel.Attributes,
  LinkModel.Base
> {
  public static includedAttributes: LinkModel.IncludedAttributes[] = [
    "id",
    "label",
    "type",
    "url",
  ];

  public static includable: IncludeOptions = {
    model: Link,
    as: LinkModel.PopulatedName,
    required: false,
    attributes: this.includedAttributes,
    where: { type: "custom" },
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
      ownerId: {
        type: DataTypes.INTEGER,
        references: {
          model: VendorAccountModel.Name,
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
