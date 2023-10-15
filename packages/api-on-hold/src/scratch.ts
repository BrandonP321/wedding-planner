/**
 * This is a scratch file for testing code.
 */
import { Sequelize } from "sequelize";
import db from "./models";
import { tempChoiceInit } from "./models/choice/choice.model";
import { tempChoiceGroupInit } from "./models/choiceGroup/choiceGroup.model";
import { tempMainChoiceInit } from "./models/mainChoice/mainChoice.model";
import { tempVendorInit } from "./models/vendor/vendor.model";
import { tempMainChoiceAttributeInit } from "./models/mainChoiceAttribute/mainChoiceAttribute.model";
import { createAssociations } from "./models/associations";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";

// tempChoiceGroupInit(sequelize);
// tempChoiceInit(sequelize);
// tempMainChoiceInit(sequelize);
// tempVendorInit(sequelize);
// tempMainChoiceAttributeInit(sequelize);

// createAssociations();
// const start = Date.now();
// sequelize.sync({ force: true }).then(async () => {
//   const secondsElapsed = (Date.now() - start) / 1000;
//   console.log(`synced in ${secondsElapsed} seconds`);

//   // await createVendors();
//   // getVendor();
// });

const getVendor = async () => {
  const vendors = await db.Vendor.findAll({
    attributes: db.Vendor.includedAttributes,
    include: [db.MainChoice.populatedIncludable],
  });

  const mappedVendors: VendorModel.APIResponse.Populated[] = vendors.map(
    (v) => v.toJSON() as any
  );

  console.log(mappedVendors[1].mainChoices[0].choiceGroups[0].choices[0].name);

  // console.log(vendors);

  // const vendor = await db.Vendor.findAll({
  //   // where: { id: 1 },
  //   include: [
  //     {
  //       model: db.MainChoice,
  //       as: "mainChoices",
  //       attributes: ["name"],
  //       include: [
  //         {
  //           model: db.ChoiceGroup,
  //           as: "choiceGroups",
  //           attributes: ["name", "type"],
  //           include: [
  //             {
  //               model: db.Choice,
  //               as: "choices",
  //               attributes: ["price", "value", "name"],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // });

  console.log(
    JSON.stringify(
      vendors.map((v) => v.toJSON()),
      null,
      2
    )
  );
};

const createVendors = async () => {
  await Promise.all([
    db.Vendor.create({
      // id: 1
      name: "Seattle Vendor",
      city: "Seattle, WA",
      description: "Seattle Vendor Description",
    }),

    db.Vendor.create({
      // id: 2
      name: "Billings Vendor",
      city: "Billings, MT",
      description: "Billings Vendor Description",
    }),
  ]);

  await Promise.all([
    db.MainChoice.create({
      // id: 1
      vendorId: 1,
      name: "Seattle Main Choice 1",
    }),

    db.MainChoice.create({
      // id: 2
      vendorId: 2,
      name: "Billings Main Choice 1",
    }),
  ]);

  await Promise.all([
    db.ChoiceGroup.create({
      // id: 1
      mainChoiceId: 1,
      name: "Seattle Main Choice 1 Choice Group 1",
      type: "custom",
    }),
    db.ChoiceGroup.create({
      // id: 2
      mainChoiceId: 1,
      name: "Seattle Main Choice 1 Choice Group 2",
      type: "custom",
    }),

    // =================

    db.ChoiceGroup.create({
      // id: 3
      mainChoiceId: 2,
      name: "Billings Main Choice 1 Choice Group 1",
      type: "custom",
    }),
  ]);

  await Promise.all([
    db.Choice.create({
      choiceGroupId: 1,
      name: "Seattle Main Choice 1 Choice 1",
      price: 1000,
      value: 1000,
    }),
    db.Choice.create({
      choiceGroupId: 1,
      name: "Seattle Main Choice 1 Choice 2",
      price: 1000,
      value: 1000,
    }),

    // =================

    db.Choice.create({
      choiceGroupId: 2,
      name: "Billings Main Choice 1 Choice 1",
      price: 1000,
      value: 1000,
    }),
    db.Choice.create({
      choiceGroupId: 2,
      name: "Billings Main Choice 1 Choice 2",
      price: 1000,
      value: 1000,
    }),
  ]);

  return;
};

const mock = {};
