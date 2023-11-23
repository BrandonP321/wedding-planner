import { FormField, InputField } from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../../PricingHelpers";

type ChoicePriceInputProps = Required<PricingEditorContextProps>;

export const ChoicePriceInput = (props: ChoicePriceInputProps) => {
  const { choice, updateChoice } = usePricingEditorContext(props);

  return (
    <FormField>
      <InputField
        value={choice?.price as any}
        onChange={(v) =>
          updateChoice((choice) => {
            choice.price = v as any;
            choice.value = v as any;
          })
        }
        type="number"
      />
    </FormField>
  );
};
