import React from "react";
import styles from "./VendorDetails.module.scss";
import { mockPhotographer } from "mockData/mockPhotographer";
import { useParams } from "react-router-dom";
import { WebMainRouteHelper } from "@wedding-planner/shared";
import {
  Carousel,
  CarouselPagination,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { VendorPricing } from "components";

export type VendorDetailsProps = {};

export const VendorDetails = (props: VendorDetailsProps) => {
  const { vendorId } = useParams<WebMainRouteHelper.VendorDetails.UrlParams>();

  const p = mockPhotographer;

  return (
    <div>
      <SpaceBetween size="xxl" vertical stretchChildren>
        <SpaceBetween vertical>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
        </SpaceBetween>

        <Carousel slides={[{}, {}, {}, {}]} slide={() => <div />}>
          <CarouselPagination />
        </Carousel>

        <SpaceBetween size="s" vertical>
          <h2>Pricing</h2>
          <VendorPricing />
        </SpaceBetween>
      </SpaceBetween>
    </div>
  );
};
