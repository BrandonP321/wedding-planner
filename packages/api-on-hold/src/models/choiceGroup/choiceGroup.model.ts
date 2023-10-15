import { DataTypes, IncludeOptions, Model, Sequelize } from "sequelize";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { asWriteable } from "@wedding-planner/shared/common/utils";
import Choice from "../choice/choice.model";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";

export default class ChoiceGroup extends Model<
  ChoiceGroupModel.Attributes,
  ChoiceGroupModel.Base
> {
  public static includedAttributes: ChoiceGroupModel.IncludedAttributes[] = [
    "id",
    "name",
    "type",
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
}

export const tempChoiceGroupInit = (sequelize: Sequelize) =>
  ChoiceGroup.init(
    {
      ...DefaultModel.SchemaAttributes,
      type: DataTypes.STRING,
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
