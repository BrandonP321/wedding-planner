import React from "react";
import {
  Alert,
  Button,
  Container,
  ContainerSpaceBetween,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { ChoiceGroupContainer } from "../ChoiceGroups/ChoiceGroupContainer";
import { usePricingEditorContext } from "../../PricingHelpers";
import { ChoiceGroupFooterActions } from "../ChoiceGroups/ChoiceGroupFooterActions";
import { MainChoiceAttributesSelector } from "./MainChoiceAttributesSelector";
import { MainChoiceOptions } from "./MainChoiceOptions";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { vendorHasSingleMainChoice } from "@wedding-planner/shared/common/vendors";
import { MainChoiceDetailsContainer } from "./MainChoiceDetailsContainer";

export type MainChoiceTabProps = { index: number };

export const MainChoiceTab = ({ index }: MainChoiceTabProps) => {
  const { mainChoice, addChoiceGroup } = usePricingEditorContext({
    mainChoiceIndex: index,
  });
  const { listing } = useAuthedVendorListing();

  const choiceGroups = mainChoice?.choiceGroups;

  const hasSingleMainChoice = vendorHasSingleMainChoice(listing?.vendorType!);

  return (
    <SpaceBetween vertical size="xxl" stretch stretchChildren>
      {!hasSingleMainChoice && <MainChoiceOptions mainChoiceIndex={index} />}

      <SpaceBetween vertical size="l" stretchChildren>
        {!hasSingleMainChoice && <h3>Main choice info</h3>}
        <ContainerSpaceBetween>
          {!hasSingleMainChoice && (
            <MainChoiceDetailsContainer mainChoiceIndex={index} />
          )}

          <Container header={<h4>Attributes</h4>}>
            <MainChoiceAttributesSelector mainChoiceIndex={index} />
          </Container>
        </ContainerSpaceBetween>
      </SpaceBetween>

      <SpaceBetween vertical size="l" stretchChildren>
        <h3>Choice groups</h3>

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
