import Choice, { tempChoiceInit } from "./choice/choice.model";
import VendorAccount, {
  tempVendorAccountInit,
} from "./vendorAccount/vendorAccount.model";
import ChoiceGroup, {
  tempChoiceGroupInit,
} from "./choiceGroup/choiceGroup.model";
import VendorImageAsset, {
  tempVendorImageAssetInit,
} from "./vendorImageAsset/vendorImageAsset.model";
import MainChoice, { tempMainChoiceInit } from "./mainChoice/mainChoice.model";
import Link, { tempLinkInit } from "./link/link.model";
import Vendor, { tempVendorInit } from "./vendor/vendor.model";
import MainChoiceAttribute, {
  tempMainChoiceAttributeInit,
} from "./mainChoiceAttribute/mainChoiceAttribute.model";
import { Sequelize, Transaction } from "sequelize";
import { OptionalKey } from "@wedding-planner/shared/common/utils/UtilityTypes";

export default {
  Choice,
  ChoiceGroup,
  MainChoice,
  Vendor,
  MainChoiceAttribute,
  VendorImageAsset,
  Link,
  VendorAccount,
};

export namespace ModelTypes {
  export type CreateOrUpdateResponse<
    T extends { id: number } = { id: number }
  > = {
    successful: boolean;
    res: T;
  };

  export type ModelCreationOrUpdateParams<
    T extends { id?: number },
    ForeignKeys extends string | undefined = undefined
  > = {
    model: OptionalKey<T, "id">;
    transaction: Transaction;
  } & (ForeignKeys extends string ? { [key in ForeignKeys]: number } : {});
}

export const sequelize = new Sequelize(
  "postgres",
  process.env.DB_USERNAME ?? "",
  process.env.DB_PASSWORD ?? "",
  {
    host: process.env.DB_HOST ?? "",
    dialect: "postgres",
    // logging: console.log,
    logging: false,
  }
);

export const initModels = () => {
  tempChoiceInit(sequelize);
  tempChoiceGroupInit(sequelize);
  tempMainChoiceInit(sequelize);
  tempVendorInit(sequelize);
  tempMainChoiceAttributeInit(sequelize);
  tempVendorImageAssetInit(sequelize);
  tempLinkInit(sequelize);
  tempVendorAccountInit(sequelize);
};

const enablePostGISExtension = async () => {
  await sequelize.query("CREATE EXTENSION IF NOT EXISTS postgis;");

  console.log("PostGIS extension enabled");
};

export const syncWithDB = () => {
  sequelize.sync().then(() => {
    // sequelize.sync({ force: true }).then(() => {
    console.log("Synced with DB");

    enablePostGISExtension();
  });
};
