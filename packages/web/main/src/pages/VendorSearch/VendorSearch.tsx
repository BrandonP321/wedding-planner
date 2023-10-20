import { SearchVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/searchVendorListings.request";
import styles from "./VendorSearch.module.scss";
import {
  ListSpaceBetween,
  PageContent,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import { VendorCard } from "components";
import {
  VendorSearchFilterMobile,
  VendorSearchFilterSideBar,
} from "components/VendorSearchFilter";
import { useState } from "react";

export type VendorSearchProps = {};

export const VendorSearch = (props: VendorSearchProps) => {
  const [vendors, setVendors] = useState<
    SearchVendorListingRequest.ResBody["vendors"] | null
  >(null);

  const handleSubmit = async (
    vendors: SearchVendorListingRequest.ResBody["vendors"]
  ) => {
    setVendors(vendors);
  };

  return (
    <>
      <VendorSearchFilterMobile onSubmit={handleSubmit} />

      <PageContent horizontalPadding verticalPadding stretch>
        <SpaceBetween
          classes={{ root: styles.searchPage }}
          size="m"
          wrap={false}
        >
          <VendorSearchFilterSideBar onSubmit={handleSubmit} />
          <ListSpaceBetween
            size="l"
            responsiveSize={{ medium: "s" }}
            itemsPerRow={3}
            responsiveItemsPerRow={{ max: 2, large: 1, medium: 2, mobile: 1 }}
            classes={{ root: styles.vendors }}
            stretch
          >
            {vendors?.map((v, i) => (
              <SpaceBetweenListItem key={i}>
                <VendorCard {...v} />
              </SpaceBetweenListItem>
            ))}
          </ListSpaceBetween>
        </SpaceBetween>
      </PageContent>
    </>
  );
};
