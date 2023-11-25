import React from "react";
import {
  Alert,
  Button,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { usePricingEditorContext } from "../../PricingHelpers";

export const MainChoiceRequiredAlert = () => {
  const { addMainChoice } = usePricingEditorContext({});

  return (
    <Alert type="error" title={<h3>Main choice required</h3>}>
      <p>
        You must add at least one main choice to your listing. A main choice is
        a category of choices that your customers can choose from.
      </p>
      <SpaceBetween justify="end">
        <Button onClick={() => addMainChoice(0)}>Add main choice</Button>
      </SpaceBetween>
    </Alert>
  );
};
