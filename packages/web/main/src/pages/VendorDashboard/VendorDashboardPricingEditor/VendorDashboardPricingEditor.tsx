import React from "react";
import styles from "./VendorDashboardPricingEditor.module.scss";
import {
  Button,
  FormikForm,
  PageContent,
  SpaceBetween,
  UnstyledForm,
} from "@wedding-planner/shared";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { PricingContainer } from "./components/PricingContainer";
import { VenueFilterTypes } from "@wedding-planner/shared/common/types";
import { ChoiceGroupModel } from "@wedding-planner/shared/api/models/choiceGroup";

export type PricingEditorValues = {
  mainChoices: Omit<MainChoiceModel.CreationOrUpdateParams, "id">[];
};

const initialValues: PricingEditorValues = {
  mainChoices: [
    {
      name: "Main choice 1",
      attributes: [
        { filterName: VenueFilterTypes.MainChoiceFilter.OUTDOOR_VENUE, id: 1 },
      ],
      choiceGroups: [
        {
          name: "Add-ons",
          id: 1,
          filterType: "none",
          choices: [
            {
              id: 1,
              filterType: "none",
              name: "Entertainment system",
              price: 1000,
              value: 1000,
            },
          ],
        },
      ],
    },
  ],
};

const blankChoiceGroup: ChoiceGroupModel.CreationOrUpdateParams = {
  id: 0,
  choices: [{ id: 0, filterType: "none", name: "", price: 0, value: 0 }],
  filterType: "none",
  name: "",
};

export type VendorDashboardPricingEditorProps = {};

export const VendorDashboardPricingEditor = (
  props: VendorDashboardPricingEditorProps
) => {
  const { loading } = useAuthedVendorListing();

  if (loading) return <div>loading...</div>;

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween align="center" vertical stretch>
        <FormikForm initialValues={initialValues} onSubmit={() => {}}>
          {({ values, setValues }) => (
            <UnstyledForm>
              <SpaceBetween size="xxl" vertical stretch>
                <h1>Pricing</h1>

                <SpaceBetween vertical size="xxl" stretch>
                  {values.mainChoices[0].choiceGroups.map((mc, i) => (
                    <PricingContainer
                      key={i}
                      mainChoiceIndex={0}
                      choiceGroupIndex={i}
                    />
                  ))}

                  <SpaceBetween classes={{ root: styles.options }}>
                    <Button
                      onClick={() => {
                        const newMainChoices = [...values.mainChoices];
                        newMainChoices[0].choiceGroups.push({
                          ...blankChoiceGroup,
                        });

                        setValues({
                          ...values,
                          mainChoices: newMainChoices,
                        });
                      }}
                    >
                      Add choice group
                    </Button>
                  </SpaceBetween>
                </SpaceBetween>
              </SpaceBetween>
            </UnstyledForm>
          )}
        </FormikForm>
      </SpaceBetween>
    </PageContent>
  );
};
