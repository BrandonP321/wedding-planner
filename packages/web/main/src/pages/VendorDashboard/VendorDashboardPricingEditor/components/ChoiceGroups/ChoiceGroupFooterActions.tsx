import {
  Button,
  SpaceBetween,
  SubmitButton,
} from "@wedding-planner/shared/web/components";
import { usePricingEditorContext } from "../../PricingHelpers";
import { useMemo } from "react";

export const ChoiceGroupFooterActions = () => {
  const {
    values: { mainChoices },
    resetForm,
  } = usePricingEditorContext({});

  const hasMainChoiceWithNoChoiceGroups = useMemo(
    () => mainChoices.some((mc) => mc.choiceGroups.length === 0),
    [mainChoices]
  );

  return (
    <SpaceBetween justify="end" stretch>
      <Button onClick={() => resetForm()}>Cancel</Button>
      <SubmitButton disabled={hasMainChoiceWithNoChoiceGroups}>
        Publish updates
      </SubmitButton>
    </SpaceBetween>
  );
};
