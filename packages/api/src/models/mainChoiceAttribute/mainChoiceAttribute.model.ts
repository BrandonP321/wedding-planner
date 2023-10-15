import {
  DataTypes,
  IncludeOptions,
  Model,
  Sequelize,
  Transaction,
} from "sequelize";
import { MainChoiceAttributeModel } from "@wedding-planner/shared/api/models/mainChoiceAttribute";
import { DefaultModel } from "@wedding-planner/shared/common/types";
import { asWriteable } from "@wedding-planner/shared/common/utils/UtilityTypes";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { CreateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/createVendorListing.request";
import { Vendor } from "@wedding-planner/shared/common/types";

export default class MainChoiceAttribute extends Model<
  MainChoiceAttributeModel.Attributes,
  MainChoiceAttributeModel.Base
> {
  public static includedAttributes: MainChoiceAttributeModel.IncludedAttributes[] =
    ["filterName", "id"];

  public static includable: IncludeOptions = {
    model: MainChoiceAttribute,
    as: MainChoiceAttributeModel.PopulatedName,
    attributes: this.includedAttributes,
  };

  public static createEntries = (params: {
    attributes: Omit<MainChoiceAttributeModel.Response, "id">[];
    mainChoiceId: number;
    transaction: Transaction;
  }) => {
    const { attributes, mainChoiceId, transaction } = params;

    return attributes.map(async (a) => {
      await MainChoiceAttribute.create({ ...a, mainChoiceId }, { transaction });
    });
  };
}

export const tempMainChoiceAttributeInit = (sequelize: Sequelize) =>
  MainChoiceAttribute.init(
    {
      ...DefaultModel.SchemaAttributes,
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
