import { DataTypes, IncludeOptions, Sequelize } from "sequelize";
import { MainChoiceAttributeModel } from "@wedding-planner/shared/api/models/mainChoiceAttribute";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { ModelTypes } from "..";
import { BaseModel } from "../BaseModel";

type CreationOrUpdateParams = ModelTypes.ModelCreationOrUpdateParams<
  MainChoiceAttributeModel.Response,
  "mainChoiceId"
>;

export default class MainChoiceAttribute extends BaseModel<
  MainChoiceAttributeModel.Attributes,
  MainChoiceAttributeModel.Base
> {
  public static includedAttributes: MainChoiceAttributeModel.IncludedAttributes[] =
    ["filterName", "id"];

  public static includable: IncludeOptions = {
    model: MainChoiceAttribute,
    as: MainChoiceAttributeModel.PopulatedName,
    required: false,
    attributes: this.includedAttributes,
  };

  public static getCreateAttributesJSON = ({
    mainChoiceId,
    model,
  }: CreationOrUpdateParams): MainChoiceAttributeModel.Base => ({
    ...model,
    mainChoiceId,
  });

  public static createOrUpdate = (params: CreationOrUpdateParams) => {
    return this._createOrUpdate(params);
  };
}

export const tempMainChoiceAttributeInit = (sequelize: Sequelize) =>
  MainChoiceAttribute.init(
    {
      ...BaseModel.SchemaAttributes,
      mainChoiceId: {
        type: DataTypes.INTEGER,
        references: {
          model: MainChoiceModel.Name,
          key: DefaultModel.Field.ID,
        },
      },
      filterName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: MainChoiceAttributeModel.Name,
      tableName: MainChoiceAttributeModel.Name,
    }
  );
