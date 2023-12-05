import {
  FormikForm,
  FormikSubmit,
  PageContent,
  SpaceBetween,
  SpinnerWrapper,
  Tabs,
  UnstyledForm,
} from "@wedding-planner/shared";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { MainChoiceTab } from "./components/MainChoices/MainChoiceTab";
import { PricingEditorValues, getBlankMainChoice } from "./PricingHelpers";
import { MainChoiceRequiredAlert } from "./components/MainChoices/MainChoiceRequiredAlert";
import { APIFetcher } from "utils";
import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { vendorHasSingleMainChoice } from "@wedding-planner/shared/common/vendors";

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
  const { loading, listing } = useAuthedVendorListing({ reFetchOnMount: true });

  const handleSubmit: FormikSubmit<PricingEditorValues> = async (values) => {
    const { mainChoices } = values;

    return await APIFetcher.updateMainChoices({ mainChoices });
  };

  const hasSingleMainChoice = vendorHasSingleMainChoice(listing?.vendorType!);

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpinnerWrapper isLoading={loading} align="start">
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
                      {!hasSingleMainChoice && <h2>Main choices</h2>}

                      {!!mainChoicesLength && (
                        <Tabs
                          hideTabs={hasSingleMainChoice}
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
      </SpinnerWrapper>
    </PageContent>
  );
};
