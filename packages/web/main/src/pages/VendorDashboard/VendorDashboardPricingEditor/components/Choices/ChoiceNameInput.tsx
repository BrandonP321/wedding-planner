import { FormField, InputField } from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../../PricingHelpers";

type ChoiceNameInputProps = Required<PricingEditorContextProps>;

export const ChoiceNameInput = (props: ChoiceNameInputProps) => {
  const { choice, updateChoice } = usePricingEditorContext(props);

  return (
    <FormField>
      <InputField
        value={choice?.name}
        placeholder="Label"
        onChange={(v) =>
          updateChoice((cg) => {
            cg.name = v;
          })
        }
      />
    </FormField>
  );
};
