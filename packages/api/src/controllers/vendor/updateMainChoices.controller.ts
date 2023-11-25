import { AuthedVendorResLocals } from "../../middleware/GetAuthedVendor.middleware";
import { sequelize } from "../../models";
import { Controller, MainChoiceUtils } from "../../utils";
import db from "../../models";
import { UpdateMainChoicesRequest } from "@wedding-planner/shared/api/requests/vendor/updateMainChoices.request";
import { Op } from "sequelize";

const controller = new Controller<
  UpdateMainChoicesRequest.ReqBody,
  UpdateMainChoicesRequest.ResBody,
  AuthedVendorResLocals,
  typeof UpdateMainChoicesRequest.Errors
>(UpdateMainChoicesRequest.Errors);

export const UpdateMainChoicesController = controller.handler(
  async (req, res, errors) => {
    const { mainChoices } = req.body;
    const { vendorId } = res.locals;

    await sequelize.transaction(async (transaction) => {
      const mainChoicesToDelete = await db.MainChoice.findAll({
        where: { vendorId },
      });

      // Create main choices with `isLive` set to false until
      // all main choices, choice groups, etc. are created
      const newMainChoices = await MainChoiceUtils.createMainChoices({
        mainChoices,
        vendorId,
        transaction,
      });

      await Promise.all(
        // For each main choice, create: choice groups, choices, and attributes
        mainChoices.map(async (mc, i) => {
          const mainChoiceId = newMainChoices[i].dataValues.id;

          // Create choice groups
          const newChoiceGroups = await MainChoiceUtils.createChoiceGroups({
            choiceGroups: mc.choiceGroups,
            mainChoiceId,
            transaction,
          });

          // Create choices & attributes in parallel
          await Promise.all([
            Promise.all(
              // For each choice group, create choices
              mc.choiceGroups.map(async (cg, j) => {
                const choiceGroupId = newChoiceGroups[j].dataValues.id;

                // Create choices
                await MainChoiceUtils.createChoices({
                  choices: cg.choices,
                  choiceGroupId,
                  transaction,
                });
              })
            ),
            // Create attributes
            MainChoiceUtils.createAttributes({
              attributes: mc.attributes,
              mainChoiceId,
              transaction,
            }),
          ]);
        })
      );

      // Delete old main choices
      const mcIDsToDelete = mainChoicesToDelete.map((mc) => mc.dataValues.id);
      await db.MainChoice.destroy({
        where: { id: { [Op.in]: mcIDsToDelete } },
        transaction,
      });

      // Update main choices to be live
      const mcIDsToUpdate = newMainChoices.map((mc) => mc.dataValues.id);
      await db.MainChoice.update(
        { isLive: true },
        { where: { id: { [Op.in]: mcIDsToUpdate } }, transaction }
      );
    });

    return res.json({}).end();
  }
);
