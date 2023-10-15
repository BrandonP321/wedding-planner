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

  db.ChoiceGroup.hasMany(db.Choice, {
    foreignKey: "choiceGroupId",
    as: "choices",
  });
  db.Choice.belongsTo(db.ChoiceGroup, { foreignKey: "choiceGroupId" });
};
