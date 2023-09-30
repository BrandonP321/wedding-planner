import styles from "./VendorSearch.module.scss";
import { getMockVendorList } from "mockData/mockVendorList";
import {
  FormikSubmit,
  ListSpaceBetween,
  PageContent,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import { VendorCard } from "components";
import {
  VendorFilterValues,
  VendorSearchFilterMobile,
  VendorSearchFilterSideBar,
} from "components/VendorSearchFilter";

export type VendorSearchProps = {};

const mockVendors = getMockVendorList(50);

export const VendorSearch = (props: VendorSearchProps) => {
  const handleSubmit: FormikSubmit<VendorFilterValues> = async (v, f) => {
    f.resetForm({ values: v });
  };

  return (
    <>
      <VendorSearchFilterMobile handleSubmit={handleSubmit} />

      <PageContent horizontalPadding verticalPadding>
        <SpaceBetween
          classes={{ root: styles.searchPage }}
          size="l"
          wrap={false}
        >
          <VendorSearchFilterSideBar handleSubmit={handleSubmit} />
          <ListSpaceBetween
            size="l"
            itemsPerRow={3}
            responsiveItemsPerRow={{ max: 2, large: 1, medium: 2, mobile: 1 }}
            classes={{ root: styles.vendors }}
          >
            {mockVendors?.map((v, i) => (
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
