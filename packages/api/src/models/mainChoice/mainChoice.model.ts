import { DataTypes, IncludeOptions, Sequelize } from "sequelize";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import ChoiceGroup from "../choiceGroup/choiceGroup.model";
import MainChoiceAttribute from "../mainChoiceAttribute/mainChoiceAttribute.model";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  MainChoiceModel.Response.Unpopulated,
  "vendorId"
>;

export default class MainChoice extends BaseModel<
  MainChoiceModel.Attributes,
  MainChoiceModel.Base
> {
  public static includedAttributes: MainChoiceModel.IncludedAttributes[] = [
    "id",
    "name",
  ];

  public static includable: IncludeOptions = {
    model: MainChoice,
    as: MainChoiceModel.PopulatedName,
    required: false,
    attributes: this.includedAttributes,
    where: { isLive: true },
  };

  public static populatedIncludable: IncludeOptions = {
    ...MainChoice.includable,
    include: [ChoiceGroup.populatedIncludable, MainChoiceAttribute.includable],
  };
}

export const tempMainChoiceInit = (sequelize: Sequelize) =>
  MainChoice.init(
    {
      ...BaseModel.SchemaAttributes,
      isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      vendorId: {
        type: DataTypes.INTEGER,
        references: {
          model: VendorModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: MainChoiceModel.Name,
      tableName: MainChoiceModel.Name,
    }
  );
