import { useFormikContext } from "formik";
import { PricingEditorValues } from "./VendorDashboardPricingEditor";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";
import { cloneDeep } from "lodash";

const blankChoiceGroup: ChoiceGroupModel.CreationOrUpdateParams = {
  id: 0,
  choices: [{ id: 0, filterType: "none", name: "", price: 0, value: 0 }],
  filterType: "none",
  name: "",
};

type MainChoices = PricingEditorValues["mainChoices"];
type MainChoice = MainChoices[number];

export type PricingEditorContextProps = {
  mainChoiceIndex?: number;
  choiceGroupIndex?: number;
  choiceIndex?: number;
};

export const usePricingEditorContext = (props: PricingEditorContextProps) => {
  const context = useFormikContext<PricingEditorValues>();

  const { values, setValues } = context;
  const { choiceGroupIndex, mainChoiceIndex, choiceIndex } = props;

  const mainChoice =
    mainChoiceIndex === undefined
      ? undefined
      : values.mainChoices[mainChoiceIndex];

  const choiceGroup =
    mainChoice && choiceGroupIndex !== undefined
      ? mainChoice.choiceGroups[choiceGroupIndex]
      : undefined;

  const choice =
    choiceGroup && choiceIndex !== undefined
      ? choiceGroup.choices[choiceIndex]
      : undefined;

  const updateMainChoices = (cb: (mainChoices: MainChoices) => void) => {
    const newMainChoices = cloneDeep(values.mainChoices);

    if (mainChoiceIndex !== undefined) {
      cb(newMainChoices);

      setValues({
        ...values,
        mainChoices: newMainChoices,
      });
    }
  };

  const updateMainChoice = (cb: (mainChoice: MainChoice) => void) => {
    updateMainChoices((mainChoices) => {
      if (mainChoiceIndex !== undefined) {
        const mainChoice = mainChoices[mainChoiceIndex];

        cb(mainChoice);
      }
    });
  };

  const updateChoiceGroups = (
    cb: (choiceGroups: ChoiceGroupModel.CreationOrUpdateParams[]) => void
  ) => {
    updateMainChoice((mainChoice) => {
      const choiceGroups = mainChoice.choiceGroups;

      cb(choiceGroups);
    });
  };

  const updateChoiceGroup = (
    cb: (choiceGroup: ChoiceGroupModel.CreationOrUpdateParams) => void
  ) => {
    updateChoiceGroups((choiceGroups) => {
      if (choiceGroupIndex !== undefined) {
        const choiceGroup = choiceGroups[choiceGroupIndex];

        cb(choiceGroup);
      }
    });
  };

  const updateChoices = (
    cb: (choices: ChoiceGroupModel.CreationOrUpdateParams["choices"]) => void
  ) => {
    updateChoiceGroup((choiceGroup) => {
      const choices = choiceGroup.choices;

      cb(choices);
    });
  };

  const updateChoice = (
    cb: (
      choice: ChoiceGroupModel.CreationOrUpdateParams["choices"][number]
    ) => void
  ) => {
    updateChoices((choices) => {
      if (choiceIndex !== undefined) {
        const choice = choices[choiceIndex];

        cb(choice);
      }
    });
  };

  const addChoiceGroup = (index: number) => {
    updateChoiceGroups((choiceGroups) => {
      choiceGroups.splice(index, 0, cloneDeep(blankChoiceGroup));
    });
  };

  return {
    mainChoice,
    choiceGroup,
    choice,
    updateChoiceGroups,
    updateChoiceGroup,
    updateMainChoices,
    updateMainChoice,
    updateChoices,
    updateChoice,
    addChoiceGroup,
    ...context,
  };
};
