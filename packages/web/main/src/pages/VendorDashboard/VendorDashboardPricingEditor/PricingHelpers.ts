import { useFormikContext } from "formik";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";
import { cloneDeep } from "lodash";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { useState } from "react";

type MainChoice = Omit<MainChoiceModel.CreationOrUpdateParams, "id">;

export type PricingEditorValues = {
  mainChoices: MainChoice[];
};

const getBlankChoiceGroup = (): ChoiceGroupModel.CreationOrUpdateParams => ({
  id: 0,
  choices: [{ id: 0, filterType: "none", name: "", price: 0, value: 0 }],
  filterType: "none",
  name: "",
});

export const getBlankMainChoice = (): MainChoice => ({
  name: "",
  attributes: [],
  choiceGroups: [getBlankChoiceGroup()],
});

export type PricingEditorContextProps = {
  mainChoiceIndex?: number;
  choiceGroupIndex?: number;
  choiceIndex?: number;
};

export const usePricingEditorContext = (props: PricingEditorContextProps) => {
  const context = useFormikContext<PricingEditorValues>();
  const [mainChoiceTabIndex, setMainChoiceTabIndex] = useState(0);

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

  const updateMainChoices = (cb: (mainChoices: MainChoice[]) => void) => {
    const newMainChoices = cloneDeep(values.mainChoices);

    cb(newMainChoices);

    setValues({
      ...values,
      mainChoices: newMainChoices,
    });
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

  const addMainChoice = (index: number) => {
    updateMainChoices((mainChoices) => {
      mainChoices.splice(index, 0, getBlankMainChoice());
    });
  };

  const addChoiceGroup = (index: number) => {
    updateChoiceGroups((choiceGroups) => {
      choiceGroups.splice(index, 0, getBlankChoiceGroup());
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
    addMainChoice,
    mainChoiceTabIndex,
    setMainChoiceTabIndex,
    ...context,
  };
};
