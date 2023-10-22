import { VendorImageAssetModel } from "@wedding-planner/shared/api/models/vendorImageAsset";
import db from ".";

export const createAssociations = () => {
  db.Vendor.hasMany(db.MainChoice, {
    foreignKey: "vendorId",
    as: "mainChoices",
  });
  db.MainChoice.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  db.MainChoice.hasMany(db.ChoiceGroup, {
    foreignKey: "mainChoiceId",
    as: "choiceGroups",
  });
  db.ChoiceGroup.belongsTo(db.MainChoice, { foreignKey: "mainChoiceId" });

  db.MainChoice.hasMany(db.MainChoiceAttribute, {
    foreignKey: "mainChoiceId",
    as: "attributes",
  });
  db.MainChoiceAttribute.belongsTo(db.MainChoice, {
    foreignKey: "mainChoiceId",
  });

  db.Vendor.hasMany(db.VendorImageAsset, {
    foreignKey: "vendorId",
    as: VendorImageAssetModel.PopulatedName,
  });
  db.VendorImageAsset.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  db.Vendor.hasMany(db.VendorImageAsset, {
    foreignKey: "vendorId",
    as: VendorImageAssetModel.ShowcasePopulatedName,
  });
  db.VendorImageAsset.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  db.ChoiceGroup.hasMany(db.Choice, {
    foreignKey: "choiceGroupId",
    as: "choices",
  });
  db.Choice.belongsTo(db.ChoiceGroup, { foreignKey: "choiceGroupId" });
};
