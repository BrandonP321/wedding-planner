import { ChoiceModel } from "@wedding-planner/shared/api/models/choice/choice.model";
import {
  AttributeEditor,
  AttributeEditorDefinition,
} from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../PricingHelpers";
import { ChoiceNameInput } from "./ChoiceNameInput";
import { ChoicePriceInput } from "./ChoicePriceInput";
import { useMemo } from "react";

const getDefinition = (
  props: Pick<
    Required<PricingEditorContextProps>,
    "choiceGroupIndex" | "mainChoiceIndex"
  >
): AttributeEditorDefinition<ChoiceModel.CreationOrUpdateParams>[] => [
  {
    label: "Option label",
    control: ({ index }) => <ChoiceNameInput {...props} choiceIndex={index} />,
  },
  {
    label: "Price",
    control: ({ index }) => <ChoicePriceInput {...props} choiceIndex={index} />,
  },
];

const blankChoice: ChoiceModel.CreationOrUpdateParams = {
  filterType: "none",
  id: 0,
  name: "",
  price: 0,
  value: 0,
};

type Props = Pick<
  Required<PricingEditorContextProps>,
  "choiceGroupIndex" | "mainChoiceIndex"
>;

export const ChoicesAttributeEditor = (props: Props) => {
  const { mainChoiceIndex, choiceGroupIndex } = props;

  const { choiceGroup, values, setValues } = usePricingEditorContext(props);

  const editorDefinition = useMemo(
    () => getDefinition({ choiceGroupIndex, mainChoiceIndex }),
    [mainChoiceIndex, choiceGroupIndex]
  );

  const removeChoice = (index: number) => {
    const newMainChoices = [...values.mainChoices];
    newMainChoices[mainChoiceIndex].choiceGroups[
      choiceGroupIndex
    ].choices.splice(index, 1);

    setValues({
      ...values,
      mainChoices: newMainChoices,
    });
  };

  const addChoice = () => {
    const newMainChoices = [...values.mainChoices];
    newMainChoices[mainChoiceIndex].choiceGroups[choiceGroupIndex].choices.push(
      { ...blankChoice }
    );

    setValues({
      ...values,
      mainChoices: newMainChoices,
    });
  };

  return (
    <AttributeEditor
      definition={editorDefinition}
      addButtonText="Add choice"
      items={choiceGroup?.choices ?? []}
      onAddButtonClick={addChoice}
      onRemoveButtonClick={removeChoice}
      maxRows={50}
    />
  );
};
