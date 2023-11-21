import { FormField, InputField } from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../PricingHelpers";

type ChoiceNameInputProps = Required<PricingEditorContextProps>;

export const ChoiceNameInput = (props: ChoiceNameInputProps) => {
  const { choiceGroupIndex, choiceIndex, mainChoiceIndex } = props;

  const { choice, values, setValues } = usePricingEditorContext(props);

  const handleChange = (value: string) => {
    const newMainChoices = [...values.mainChoices];
    newMainChoices[mainChoiceIndex].choiceGroups[choiceGroupIndex].choices[
      choiceIndex
    ].name = value;

    setValues({ ...values, mainChoices: newMainChoices });
  };

  return (
    <FormField>
      <InputField
        value={choice?.name}
        onChange={handleChange}
        placeholder="Label"
      />
    </FormField>
  );
};
