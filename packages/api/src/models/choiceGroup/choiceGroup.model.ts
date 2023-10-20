import { DataTypes, IncludeOptions, Model, Sequelize } from "sequelize";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import Choice from "../choice/choice.model";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  ChoiceGroupModel.Response.Unpopulated,
  "mainChoiceId"
>;

export default class ChoiceGroup extends BaseModel<
  ChoiceGroupModel.Attributes,
  ChoiceGroupModel.Base
> {
  public static includedAttributes: ChoiceGroupModel.IncludedAttributes[] = [
    "id",
    "name",
    "filterType",
  ];

  public static includable: IncludeOptions = {
    model: ChoiceGroup,
    as: ChoiceGroupModel.PopulatedName,
    attributes: this.includedAttributes,
  };

  public static populatedIncludable: IncludeOptions = {
    ...ChoiceGroup.includable,
    include: [Choice.includable],
  };

  public static getCreateAttributesJSON = ({
    mainChoiceId,
    model,
  }: CreationOrUpdateParams): ChoiceGroupModel.Base => ({
    ...model,
    mainChoiceId,
  });

  public static createOrUpdate = (params: CreationOrUpdateParams) => {
    return this._createOrUpdate(params);
  };
}

export const tempChoiceGroupInit = (sequelize: Sequelize) =>
  ChoiceGroup.init(
    {
      ...BaseModel.SchemaAttributes,
      filterType: DataTypes.STRING,
      mainChoiceId: {
        type: DataTypes.INTEGER,
        references: {
          model: MainChoiceModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: ChoiceGroupModel.Name,
      tableName: ChoiceGroupModel.Name,
    }
  );
