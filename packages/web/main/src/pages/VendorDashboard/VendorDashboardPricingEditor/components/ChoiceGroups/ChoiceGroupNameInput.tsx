import { FormField, InputField } from "@wedding-planner/shared/web/components";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../../PricingHelpers";

type Props = Pick<
  Required<PricingEditorContextProps>,
  "mainChoiceIndex" | "choiceGroupIndex"
>;

export const ChoiceGroupNameInput = (props: Props) => {
  const { choiceGroup, updateChoiceGroup } = usePricingEditorContext(props);

  return (
    <FormField>
      <InputField
        value={choiceGroup?.name}
        onChange={(v) =>
          updateChoiceGroup((cg) => {
            cg.name = v;
          })
        }
        placeholder="Untitled"
      />
    </FormField>
  );
};
