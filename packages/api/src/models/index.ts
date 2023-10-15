import Choice, { tempChoiceInit } from "./choice/choice.model";
import ChoiceGroup, {
  tempChoiceGroupInit,
} from "./choiceGroup/choiceGroup.model";
import MainChoice, { tempMainChoiceInit } from "./mainChoice/mainChoice.model";
import Vendor, { tempVendorInit } from "./vendor/vendor.model";
import MainChoiceAttribute, {
  tempMainChoiceAttributeInit,
} from "./mainChoiceAttribute/mainChoiceAttribute.model";
import { Sequelize } from "sequelize";

export default {
  Choice,
  ChoiceGroup,
  MainChoice,
  Vendor,
  MainChoiceAttribute,
};

export const sequelize = new Sequelize(
  "postgres",
  process.env.DB_USERNAME ?? "",
  process.env.DB_PASSWORD ?? "",
  {
    host: process.env.DB_HOST ?? "",
    dialect: "postgres",
    logging: false,
  }
);

export const initModels = () => {
  tempChoiceInit(sequelize);
  tempChoiceGroupInit(sequelize);
  tempMainChoiceInit(sequelize);
  tempVendorInit(sequelize);
  tempMainChoiceAttributeInit(sequelize);
};
export const syncWithDB = () => {
  sequelize.sync().then(() => {
    // sequelize.sync({ force: true }).then(() => {
    console.log("Synced with DB");
  });
};
