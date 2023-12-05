import {
  Container,
  FormField,
  InputField,
} from "@wedding-planner/shared/web/components";
import { FormSpaceBetween } from "components/SpaceBetween/SpaceBetween";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../../PricingHelpers";

type Props = Pick<PricingEditorContextProps, "mainChoiceIndex">;

export const MainChoiceDetailsContainer = (props: Props) => {
  const { updateMainChoice, mainChoice } = usePricingEditorContext(props);

  return (
    <Container header={<h4>Details</h4>}>
      <FormSpaceBetween stretchChildren>
        <FormField label="Title">
          <InputField
            value={mainChoice?.name}
            placeholder="Title"
            onChange={(v) =>
              updateMainChoice((mc) => {
                mc.name = v;
              })
            }
          />
        </FormField>
      </FormSpaceBetween>
    </Container>
  );
};
