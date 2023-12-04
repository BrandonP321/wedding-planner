import React from "react";
import { AccountForm } from "./components/AccountForm";
import {
  CustomFormProvider,
  PageContent,
  SpaceBetween,
  SpinnerWrapper,
} from "@wedding-planner/shared/web/components";
import { useAuthedVendorAccount } from "store/slices/vendorAccount/vendorAccountHooks";

export type VendorDashboardAccountProps = {};

export const VendorDashboardAccount = (props: VendorDashboardAccountProps) => {
  const { loading } = useAuthedVendorAccount({ reFetchOnMount: true });

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween align="center" vertical>
        <CustomFormProvider isEditableDefaultValue={false}>
          <SpinnerWrapper isLoading={loading} align="start">
            <AccountForm />
          </SpinnerWrapper>
        </CustomFormProvider>
      </SpaceBetween>
    </PageContent>
  );
};
