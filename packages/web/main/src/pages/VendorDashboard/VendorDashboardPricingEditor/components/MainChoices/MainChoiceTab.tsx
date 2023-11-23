import React from "react";
import styles from "../VendorDashboardPricingEditor.module.scss";
import {
  Alert,
  Button,
  Container,
  ContainerSpaceBetween,
  FormField,
  InputField,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { ChoiceGroupContainer } from "../ChoiceGroups/ChoiceGroupContainer";
import { usePricingEditorContext } from "../../PricingHelpers";
import { ChoiceGroupFooterActions } from "../ChoiceGroups/ChoiceGroupFooterActions";
import { FormSpaceBetween } from "components/SpaceBetween/SpaceBetween";
import { MainChoiceAttributesSelector } from "./MainChoiceAttributesSelector";

export type MainChoiceTabProps = { index: number };

export const MainChoiceTab = ({ index }: MainChoiceTabProps) => {
  const { mainChoice, addChoiceGroup, updateMainChoice } =
    usePricingEditorContext({
      mainChoiceIndex: index,
    });

  const choiceGroups = mainChoice?.choiceGroups;

  return (
    <SpaceBetween vertical size="xxl" stretch stretchChildren>
      <SpaceBetween vertical size="l" stretchChildren>
        <h2>Main choice info</h2>

        <ContainerSpaceBetween>
          <Container header={<h3>Basic info</h3>}>
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

              <FormField label="Description">
                <InputField />
              </FormField>
            </FormSpaceBetween>
          </Container>

          <Container header={<h3>Attributes</h3>}>
            <MainChoiceAttributesSelector mainChoiceIndex={index} />
          </Container>
        </ContainerSpaceBetween>
      </SpaceBetween>

      <SpaceBetween vertical size="l" stretchChildren>
        <h2>Choice groups</h2>

        {!!choiceGroups?.length && (
          <ContainerSpaceBetween>
            {choiceGroups?.map((mc, i) => (
              <ChoiceGroupContainer
                key={i}
                mainChoiceIndex={index}
                choiceGroupIndex={i}
              />
            ))}
          </ContainerSpaceBetween>
        )}

        {!choiceGroups?.length && (
          <Alert type="error" title={<h3>Choice group required</h3>}>
            <p>
              You must add at least one choice group to your main choice. A
              choice group is a collection of choices that are related to each
              other.
            </p>
            <SpaceBetween justify="end">
              <Button onClick={() => addChoiceGroup(0)}>
                Add choice group
              </Button>
            </SpaceBetween>
          </Alert>
        )}
      </SpaceBetween>

      <ChoiceGroupFooterActions />
    </SpaceBetween>
  );
};
