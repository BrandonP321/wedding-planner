import React from "react";
import styles from "./VendorDashboardPricingEditor.module.scss";
import {
  FormikForm,
  FormikSubmit,
  PageContent,
  SpaceBetween,
  Tabs,
  UnstyledForm,
} from "@wedding-planner/shared";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { VenueFilterTypes } from "@wedding-planner/shared/common/types";
import { MainChoiceTab } from "./components/MainChoices/MainChoiceTab";

type MainChoice = Omit<MainChoiceModel.CreationOrUpdateParams, "id">;

export type PricingEditorValues = {
  mainChoices: MainChoice[];
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

export type VendorDashboardPricingEditorProps = {};

export const VendorDashboardPricingEditor = (
  props: VendorDashboardPricingEditorProps
) => {
  const { loading } = useAuthedVendorListing();

  if (loading) return <div>loading...</div>;

  const handleSubmit: FormikSubmit<PricingEditorValues> = async (values) => {
    console.log(values);
  };

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween align="center" vertical stretch>
        <FormikForm initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => (
            <UnstyledForm>
              <SpaceBetween size="xxl" vertical stretch>
                <h1>Pricing</h1>

                <Tabs
                  tabs={values.mainChoices.map((mc, i) => ({
                    title: mc.name || "Untitled",
                    content: <MainChoiceTab key={i} index={i} />,
                  }))}
                />
              </SpaceBetween>
            </UnstyledForm>
          )}
        </FormikForm>
      </SpaceBetween>
    </PageContent>
  );
};
