import { VendorImageAssetModel } from "@wedding-planner/shared/api/models/vendorImageAsset";
import db from ".";
import { LinkModel } from "@wedding-planner/shared/api/models/Link/link.model";

export const createAssociations = () => {
  // Main Choices
  db.Vendor.hasMany(db.MainChoice, {
    foreignKey: "vendorId",
    as: "mainChoices",
  });
  db.MainChoice.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  // Choice Groups
  db.MainChoice.hasMany(db.ChoiceGroup, {
    foreignKey: "mainChoiceId",
    as: "choiceGroups",
  });
  db.ChoiceGroup.belongsTo(db.MainChoice, { foreignKey: "mainChoiceId" });

  // Main Choice Attributes
  db.MainChoice.hasMany(db.MainChoiceAttribute, {
    foreignKey: "mainChoiceId",
    as: "attributes",
  });
  db.MainChoiceAttribute.belongsTo(db.MainChoice, {
    foreignKey: "mainChoiceId",
  });

  // Images
  db.Vendor.hasMany(db.VendorImageAsset, {
    foreignKey: "vendorId",
    as: VendorImageAssetModel.PopulatedName,
  });
  db.VendorImageAsset.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  // Showcase Images
  db.Vendor.hasMany(db.VendorImageAsset, {
    foreignKey: "vendorId",
    as: VendorImageAssetModel.ShowcasePopulatedName,
  });
  db.VendorImageAsset.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  // Links
  db.Vendor.hasMany(db.Link, {
    foreignKey: "vendorId",
    as: LinkModel.PopulatedName,
  });
  db.Link.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  // Social Links
  db.Vendor.hasMany(db.Link, {
    foreignKey: "vendorId",
    as: LinkModel.SocialLinksPopulatedName,
  });
  db.Link.belongsTo(db.Vendor, { foreignKey: "vendorId" });

  // Choices
  db.ChoiceGroup.hasMany(db.Choice, {
    foreignKey: "choiceGroupId",
    as: "choices",
  });
  db.Choice.belongsTo(db.ChoiceGroup, { foreignKey: "choiceGroupId" });
};
