import { FormField, InputField } from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../PricingHelpers";

type Props = Pick<
  Required<PricingEditorContextProps>,
  "mainChoiceIndex" | "choiceGroupIndex"
>;

export const PricingNameInput = (props: Props) => {
  const { choiceGroup, values, setValues } = usePricingEditorContext(props);

  const { choiceGroupIndex, mainChoiceIndex } = props;

  const handleChange = (value: string) => {
    const newMainChoices = [...values.mainChoices];
    newMainChoices[mainChoiceIndex].choiceGroups[choiceGroupIndex].name = value;

    setValues({ ...values, mainChoices: newMainChoices });
  };

  return (
    <FormField>
      <InputField
        value={choiceGroup?.name}
        onChange={handleChange}
        placeholder="Unamed choice group"
      />
    </FormField>
  );
};
