import React from "react";
import styles from "./VendorPricing.module.scss";
import { Tabs } from "@wedding-planner/shared/web/components";
import { mockVenue } from "../../mockData/mockVenue";
import { VendorMainChoice } from "@wedding-planner/shared/common/types/vendorPriceOptions";

export type VendorPricingProps = {};

export const VendorPricing = (props: VendorPricingProps) => {
  return (
    <div>
      <Tabs
        tabs={mockVenue.mainChoices.map((c, i) => ({
          title: c.name,
          content: <TabContent {...c} />,
        }))}
      />
    </div>
  );
};

type TabContentProps = VendorMainChoice;

const TabContent = ({ name }: TabContentProps) => {
  return <h1>{name}</h1>;
};
