import React from "react";
import styles from "./VendorDashboardImages.module.scss";
import {
  Header,
  PageContent,
  SpaceBetween,
  SpinnerWrapper,
} from "@wedding-planner/shared/web/components";
import { LocalImageSelector } from "components";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { LocalImageSelectorProvider } from "components/LocalImageSelector/LocalImageSelectorProvider";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export type VendorDashboardImagesProps = {};

export const VendorDashboardImages = (props: VendorDashboardImagesProps) => {
  const { loading } = useAuthedVendorListing({ reFetchOnMount: true });

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween size="l" vertical stretch>
        <Header title="Images" description={lorem} />
        <SpinnerWrapper isLoading={loading} align="start">
          <LocalImageSelectorProvider>
            <LocalImageSelector />
          </LocalImageSelectorProvider>
        </SpinnerWrapper>
      </SpaceBetween>
    </PageContent>
  );
};
