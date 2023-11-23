import React from "react";
import {
  Button,
  SpaceBetween,
  SubmitButton,
} from "@wedding-planner/shared/web/components";
import { usePricingEditorContext } from "../../PricingHelpers";

export const ChoiceGroupFooterActions = () => {
  const { resetForm } = usePricingEditorContext({});

  return (
    <SpaceBetween justify="end" stretch>
      <Button onClick={() => resetForm()}>Cancel</Button>
      <SubmitButton>Publish updates</SubmitButton>
    </SpaceBetween>
  );
};
