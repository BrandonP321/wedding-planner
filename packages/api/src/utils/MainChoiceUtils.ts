import { MainChoiceAttributeModel } from "@wedding-planner/shared/api/models/mainChoiceAttribute/mainChoiceAttribute.model";
import db from "../models";
import { Transaction } from "sequelize";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";
import { ChoiceModel } from "@wedding-planner/shared/api/models/choice";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";

type MainChoice = MainChoiceModel.CreationParams;
type MCAttribute = MainChoiceAttributeModel.CreationParams;
type ChoiceGroup = ChoiceGroupModel.CreationParams;
type Choice = ChoiceModel.CreationParams;

type CreateProps = {
  mainChoiceId: number;
  transaction: Transaction;
};

type CreateMainChoicesProps = Pick<CreateProps, "transaction"> & {
  vendorId: number;
  mainChoices: MainChoice[];
};
type CreateAttributesProps = CreateProps & { attributes: MCAttribute[] };
type CreateChoiceGroupsProps = CreateProps & { choiceGroups: ChoiceGroup[] };
type CreateChoicesProps = Pick<CreateProps, "transaction"> & {
  choices: Choice[];
  choiceGroupId: number;
};

export class MainChoiceUtils {
  public static createMainChoices = (props: CreateMainChoicesProps) =>
    Promise.all(
      props.mainChoices.map(
        async (mc) =>
          await db.MainChoice.create(
            { name: mc.name, vendorId: props.vendorId, isLive: false },
            { transaction: props.transaction }
          )
      )
    );

  /** Attributes can be bulk created since nothing depends on their IDs */
  public static createAttributes = (props: CreateAttributesProps) =>
    db.MainChoiceAttribute.bulkCreate(
      props.attributes.map((a) => ({
        filterName: a.filterName,
        mainChoiceId: props.mainChoiceId,
      })),
      { transaction: props.transaction }
    );

  public static createChoiceGroups = (props: CreateChoiceGroupsProps) =>
    Promise.all(
      props.choiceGroups.map(
        async (cg) =>
          await db.ChoiceGroup.create(
            {
              filterType: cg.filterType,
              name: cg.name,
              mainChoiceId: props.mainChoiceId,
            },
            { transaction: props.transaction }
          )
      )
    );

  /** Choices can be bulk created since nothing depends on their IDs */
  public static createChoices = (props: CreateChoicesProps) =>
    db.Choice.bulkCreate(
      props.choices.map((c) => ({
        filterType: c.filterType,
        name: c.name,
        price: c.price,
        value: c.value,
        choiceGroupId: props.choiceGroupId,
      })),
      { transaction: props.transaction }
    );
}
