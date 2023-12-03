import {
  FormikForm,
  FormikSubmit,
  PageContent,
  SpaceBetween,
  Tabs,
  UnstyledForm,
} from "@wedding-planner/shared";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { MainChoiceTab } from "./components/MainChoices/MainChoiceTab";
import { PricingEditorValues, getBlankMainChoice } from "./PricingHelpers";
import { MainChoiceRequiredAlert } from "./components/MainChoices/MainChoiceRequiredAlert";
import { APIFetcher } from "utils";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";

const getInitialValues = (
  mainChoices?: MainChoiceModel.CreationParams[]
): PricingEditorValues => ({
  mainChoices:
    mainChoices && mainChoices.length > 0
      ? mainChoices
      : [getBlankMainChoice()],
});

export type VendorDashboardPricingEditorProps = {};

export const VendorDashboardPricingEditor = (
  props: VendorDashboardPricingEditorProps
) => {
  const { loading, listing } = useAuthedVendorListing();

  if (loading) return <div>loading...</div>;

  const handleSubmit: FormikSubmit<PricingEditorValues> = async (values) => {
    const { mainChoices } = values;

    return await APIFetcher.updateMainChoices({ mainChoices });
  };

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween align="center" vertical stretch>
        <FormikForm
          initialValues={getInitialValues(listing?.mainChoices)}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            const mainChoicesLength = values.mainChoices.length;

            return (
              <UnstyledForm>
                <SpaceBetween size="xxl" vertical stretch>
                  <h1>Pricing</h1>

                  <SpaceBetween size="m" vertical stretch>
                    <h2>Main choices</h2>

                    {!!mainChoicesLength && (
                      <Tabs
                        tabs={values.mainChoices.map((mc, i) => ({
                          title: mc.name || "Untitled",
                          content: <MainChoiceTab key={i} index={i} />,
                        }))}
                      />
                    )}

                    {!mainChoicesLength && <MainChoiceRequiredAlert />}
                  </SpaceBetween>
                </SpaceBetween>
              </UnstyledForm>
            );
          }}
        </FormikForm>
      </SpaceBetween>
    </PageContent>
  );
};
