import { DataTypes, IncludeOptions, Model, Sequelize } from "sequelize";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { asWriteable } from "@wedding-planner/shared/common/utils";
import ChoiceGroup from "../choiceGroup/choiceGroup.model";
import MainChoiceAttribute from "../mainChoiceAttribute/mainChoiceAttribute.model";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";

export default class MainChoice extends Model<
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
    attributes: this.includedAttributes,
  };

  public static populatedIncludable: IncludeOptions = {
    ...MainChoice.includable,
    include: [ChoiceGroup.populatedIncludable, MainChoiceAttribute.includable],
  };
}

export const tempMainChoiceInit = (sequelize: Sequelize) =>
  MainChoice.init(
    {
      ...DefaultModel.SchemaAttributes,
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
