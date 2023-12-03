import React from "react";
import { AccountForm } from "./components/AccountForm";
import {
  CustomFormProvider,
  PageContent,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { useAuthedVendorAccount } from "store/slices/vendorAccount/vendorAccountHooks";

export type VendorDashboardAccountProps = {};

export const VendorDashboardAccount = (props: VendorDashboardAccountProps) => {
  const { loading } = useAuthedVendorAccount();

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween align="center" vertical>
        <CustomFormProvider isEditableDefaultValue={false}>
          {loading && <div>Loading...</div>}
          {!loading && <AccountForm />}
        </CustomFormProvider>
      </SpaceBetween>
    </PageContent>
  );
};
