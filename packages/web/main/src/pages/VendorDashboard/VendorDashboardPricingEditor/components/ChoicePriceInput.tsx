import { FormField, InputField } from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../PricingHelpers";

type ChoicePriceInputProps = Required<PricingEditorContextProps>;

export const ChoicePriceInput = (props: ChoicePriceInputProps) => {
  const { choiceGroupIndex, choiceIndex, mainChoiceIndex } = props;

  const { choice, values, setValues } = usePricingEditorContext(props);

  const handleChange = (value: number) => {
    const newMainChoices = [...values.mainChoices];
    const choice =
      newMainChoices[mainChoiceIndex].choiceGroups[choiceGroupIndex].choices[
        choiceIndex
      ];

    choice.price = value;
    choice.value = value;

    setValues({ ...values, mainChoices: newMainChoices });
  };

  return (
    <FormField>
      <InputField
        value={choice?.price as any}
        onChange={(v) => handleChange(v as any)}
        type="number"
      />
    </FormField>
  );
};
