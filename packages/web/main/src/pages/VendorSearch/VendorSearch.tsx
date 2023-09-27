import styles from "./VendorSearch.module.scss";
import { getMockVendorList } from "mockData/mockVendorList";
import {
  FormikSubmit,
  ListSpaceBetween,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import { VendorCard } from "components";
import {
  VendorFilterValues,
  VendorSearchFilterSideBar,
} from "components/VendorSearchFilter/VendorSearchFilter";

export type VendorSearchProps = {};

const mockVendors = getMockVendorList(50);

export const VendorSearch = (props: VendorSearchProps) => {
  const handleSubmit: FormikSubmit<VendorFilterValues> = async (v, f) => {
    f.resetForm({ values: v });
  };

  return (
    <SpaceBetween classes={{ root: styles.searchPage }} size="l">
      <VendorSearchFilterSideBar handleSubmit={handleSubmit} />
      <ListSpaceBetween
        size="l"
        itemsPerRow={4}
        responsiveItemsPerRow={{ max: 3, large: 2, medium: 1 }}
        classes={{ root: styles.vendors }}
      >
        {mockVendors?.map((v, i) => (
          <SpaceBetweenListItem key={i}>
            <VendorCard {...v} />
          </SpaceBetweenListItem>
        ))}
      </ListSpaceBetween>
    </SpaceBetween>
  );
};
