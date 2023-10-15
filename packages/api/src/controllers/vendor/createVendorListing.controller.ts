import { CreateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/createVendorListing.request";
import { Controller } from "../../utils/ControllerUtils";
import db, { sequelize } from "../../models";

const controller = new Controller<
  CreateVendorListingRequest.ReqBody,
  CreateVendorListingRequest.ResBody,
  {},
  typeof CreateVendorListingRequest.Errors
>(CreateVendorListingRequest.Errors);

export const CreateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendor: reqVendor } = req.body;

    const { vendorId } = await sequelize.transaction(async (t) => {
      const { mainChoices, ...vendor } = reqVendor;

      // Create vendor
      const createdVendor = await db.Vendor.create(vendor, { transaction: t });

      // Wait for all mainChoices to be created
      await Promise.all(
        mainChoices.map(async ({ choiceGroups, attributes, ...mainChoice }) => {
          // Create mainChoice
          const createdMainChoice = await db.MainChoice.create(
            { ...mainChoice, vendorId: createdVendor.dataValues.id },
            { transaction: t }
          );

          // Wait for all attributes to be created
          await Promise.all(
            db.MainChoiceAttribute.createEntries({
              attributes,
              mainChoiceId: createdMainChoice.dataValues.id,
              transaction: t,
            })
          );

          // Wait for all choiceGroups to be created
          await Promise.all(
            choiceGroups.map(async ({ choices, ...choiceGroup }) => {
              // Create choiceGroup
              const createdChoiceGroup = await db.ChoiceGroup.create(
                {
                  ...choiceGroup,
                  mainChoiceId: createdMainChoice.dataValues.id,
                },
                { transaction: t }
              );

              // Wait for all choices to be created
              await Promise.all(
                choices.map(async (choice) => {
                  await db.Choice.create(
                    {
                      ...choice,
                      choiceGroupId: createdChoiceGroup.dataValues.id,
                    },
                    { transaction: t }
                  );
                })
              );
            })
          );
        })
      );

      return { vendorId: createdVendor.dataValues.id };
    });

    return res.json({ vendorId }).end();
  }
);
