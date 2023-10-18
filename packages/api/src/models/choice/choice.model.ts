import { DataTypes, IncludeOptions, Model, Sequelize } from "sequelize";
import { ChoiceModel } from "@wedding-planner/shared/api/models/choice";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  ChoiceModel.Response,
  "choiceGroupId"
>;

export default class Choice extends BaseModel<
  ChoiceModel.Attributes,
  ChoiceModel.Base
> {
  public static includedAttributes: ChoiceModel.IncludedAttributes[] = [
    "id",
    "name",
    "price",
    "value",
    "filterType",
  ];

  public static includable: IncludeOptions = {
    model: Choice,
    as: ChoiceModel.PopulatedName,
    attributes: this.includedAttributes,
  };

  public static getCreateAttributesJSON = ({
    choiceGroupId,
    model,
  }: CreationOrUpdateParams): ChoiceModel.Base => ({ ...model, choiceGroupId });

  public static createOrUpdate = (params: CreationOrUpdateParams) => {
    return this._createOrUpdate(params);
  };
}

export const tempChoiceInit = (sequelize: Sequelize) =>
  Choice.init(
    {
      ...DefaultModel.SchemaAttributes,
      choiceGroupId: {
        type: DataTypes.INTEGER,
        references: {
          model: ChoiceGroupModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      filterType: DataTypes.STRING,
      price: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: ChoiceModel.Name,
      tableName: ChoiceModel.Name,
    }
  );
