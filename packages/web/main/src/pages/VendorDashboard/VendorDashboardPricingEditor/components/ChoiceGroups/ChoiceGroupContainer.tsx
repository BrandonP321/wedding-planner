import React from "react";
import styles from "../VendorDashboardPricingEditor.module.scss";
import {
  Button,
  Container,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { ChoiceGroupNameInput } from "./ChoiceGroupNameInput";
import { ChoicesAttributeEditor } from "../Choices/ChoicesAttributeEditor";
import { usePricingEditorContext } from "../../PricingHelpers";

type Props = {
  mainChoiceIndex: number;
  choiceGroupIndex: number;
};

export const ChoiceGroupContainer = (props: Props) => {
  const { choiceGroupIndex } = props;

  const { updateChoiceGroups, addChoiceGroup } = usePricingEditorContext(props);

  const removeChoiceGroup = () => {
    updateChoiceGroups((choiceGroups) => {
      choiceGroups.splice(choiceGroupIndex, 1);
    });
  };

  return (
    <Container
      header={<ChoiceGroupNameInput {...props} />}
      footer={
        <SpaceBetween justify="end">
          <Button onClick={removeChoiceGroup}>Remove</Button>
          <Button onClick={() => addChoiceGroup(choiceGroupIndex + 1)}>
            Add choice group
          </Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween vertical size="s" stretchChildren>
        <h3>Choices</h3>

        <ChoicesAttributeEditor {...props} />
      </SpaceBetween>
    </Container>
  );
};
