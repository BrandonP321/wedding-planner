import React from "react";
import styles from "./VendorDetails.module.scss";
import { mockPhotographer } from "mockData/mockPhotographer";
import { useParams } from "react-router-dom";
import { WebMainRouteHelper } from "@wedding-planner/shared";
import {
  Carousel,
  CarouselPagination,
  PageContent,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { VendorPricing } from "components";

export type VendorDetailsProps = {};

export const VendorDetails = (props: VendorDetailsProps) => {
  const { vendorId } = useParams<WebMainRouteHelper.VendorDetails.UrlParams>();

  const p = mockPhotographer;

  return (
    <PageContent verticalPadding>
      <SpaceBetween size="xxl" vertical stretchChildren>
        <PageContent horizontalPadding>
          <SpaceBetween vertical>
            <h1>{p.name}</h1>
            <p>{p.description}</p>
          </SpaceBetween>
        </PageContent>

        <Carousel slides={[{}, {}, {}, {}]} slide={() => <div />}>
          <CarouselPagination />
        </Carousel>

        <SpaceBetween size="s" vertical>
          <PageContent horizontalPadding>
            <h2>Pricing</h2>
          </PageContent>
          <VendorPricing />
        </SpaceBetween>
      </SpaceBetween>
    </PageContent>
  );
};
