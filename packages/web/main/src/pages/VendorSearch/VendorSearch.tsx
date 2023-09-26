import React from "react";
import styles from "./VendorSearch.module.scss";
import { getMockVendorList } from "mockData/mockVendorList";
import {
  ListSpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import { VendorCard } from "components";

export type VendorSearchProps = {};

const mockVendors = getMockVendorList(10);

export const VendorSearch = (props: VendorSearchProps) => {
  return (
    <div>
      <ListSpaceBetween
        size="l"
        responsiveSize={{ mobile: "l" }}
        itemsPerRow={3}
        responsiveItemsPerRow={{ large: 2, mobile: 1 }}
        classes={{ root: styles.vendors }}
      >
        {mockVendors?.map((v, i) => (
          <SpaceBetweenListItem key={i}>
            <VendorCard {...v} />
          </SpaceBetweenListItem>
        ))}
      </ListSpaceBetween>
    </div>
  );
};
