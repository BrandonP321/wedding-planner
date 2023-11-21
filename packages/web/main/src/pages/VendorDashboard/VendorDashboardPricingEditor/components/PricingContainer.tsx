import React from "react";
import styles from "./PricingContainer.module.scss";
import {
  Container,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { PricingNameInput } from "./PricingNameInput";
import { ChoicesAttributeEditor } from "./ChoicesAttributeEditor";

export type PricingContainerProps = {
  mainChoiceIndex: number;
  choiceGroupIndex: number;
};

export const PricingContainer = (props: PricingContainerProps) => {
  return (
    <Container header={<PricingNameInput {...props} />}>
      <SpaceBetween vertical size="s" stretchChildren>
        <h3>Choices</h3>

        <ChoicesAttributeEditor {...props} />
      </SpaceBetween>
    </Container>
  );
};
