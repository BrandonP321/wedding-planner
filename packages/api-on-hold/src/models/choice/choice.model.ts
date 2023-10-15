import { DataTypes, IncludeOptions, Model, Sequelize } from "sequelize";
import { ChoiceModel } from "@wedding-planner/shared/api/models/choice";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { asWriteable } from "@wedding-planner/shared/common/utils";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";

export default class Choice extends Model<
  ChoiceModel.Attributes,
  ChoiceModel.Base
> {
  public static includedAttributes: ChoiceModel.IncludedAttributes[] = [
    "id",
    "name",
    "price",
    "value",
  ];

  public static includable: IncludeOptions = {
    model: Choice,
    as: ChoiceModel.PopulatedName,
    attributes: this.includedAttributes,
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
