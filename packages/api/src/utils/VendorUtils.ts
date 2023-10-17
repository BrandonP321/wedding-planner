import { Vendor } from "@wedding-planner/shared/common/types";
import db, { sequelize } from "../models";

export class VendorUtils {
  public static createOrUpdateVendor = async (
    vendor: Vendor.VendorWithOptionalIDs
  ) => {
    return await sequelize.transaction(async (transaction) => {
      const {
        res: { id: vendorId },
      } = await db.Vendor.createOrUpdate({
        model: vendor,
        transaction,
      });

      await Promise.all(
        vendor.mainChoices.map(async (mainChoice) => {
          const {
            res: { id: mainChoiceId },
          } = await db.MainChoice.createOrUpdate({
            model: mainChoice,
            vendorId,
            transaction,
          });

          await Promise.all(
            mainChoice.attributes.map(async (mainChoiceAttribute) => {
              await db.MainChoiceAttribute.createOrUpdate({
                model: mainChoiceAttribute,
                mainChoiceId,
                transaction,
              });
            })
          );

          await Promise.all(
            mainChoice.choiceGroups.map(async (choiceGroup) => {
              const {
                res: { id: choiceGroupId },
              } = await db.ChoiceGroup.createOrUpdate({
                model: choiceGroup,
                mainChoiceId,
                transaction,
              });

              await Promise.all(
                choiceGroup.choices.map(async (choice) => {
                  await db.Choice.createOrUpdate({
                    model: choice,
                    choiceGroupId,
                    transaction,
                  });
                })
              );
            })
          );
        })
      );

      return { vendorId };
    });
  };
}
