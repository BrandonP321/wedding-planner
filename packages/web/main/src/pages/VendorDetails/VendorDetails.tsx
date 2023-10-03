import React from "react";
import styles from "./VendorDetails.module.scss";
import { mockPhotographer } from "mockData/mockPhotographer";
import { useParams } from "react-router-dom";
import { WebMainRouteHelper } from "@wedding-planner/shared";
import {
  ClickableThumbnail,
  ListSpaceBetween,
  MediaCarousel,
  PageContent,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import { VendorPricing } from "components";
import { useResponsive } from "@wedding-planner/shared/web/store";

export type VendorDetailsProps = {};

export const VendorDetails = (props: VendorDetailsProps) => {
  const { vendorId } = useParams<WebMainRouteHelper.VendorDetails.UrlParams>();
  const { mobile } = useResponsive();

  const p = mockPhotographer;

  return (
    <PageContent bottomPadding>
      <SpaceBetween size="s" vertical stretchChildren>
        <MediaCarousel
          slides={p.media}
          classes={{ root: styles.showcaseCarousel }}
        />

        <SpaceBetween size="xxl" vertical>
          <PageContent horizontalPadding>
            <SpaceBetween vertical stretchChildren>
              <h1>{p.name}</h1>
              <p>{p.description}</p>
              {true && (
                <SpaceBetween
                  size="l"
                  responsiveJustify={{ mobile: "center" }}
                  responsiveSize={{ mobile: "s" }}
                >
                  <ClickableThumbnail
                    img="https://placehold.co/1920x1080"
                    title="58 images"
                    onClick={() => alert("open images")}
                    classes={{ root: styles.mediaThumb }}
                  />
                  <ClickableThumbnail
                    img="https://placehold.co/1920x1080"
                    title="4 videos"
                    onClick={() => alert("open videos")}
                    classes={{ root: styles.mediaThumb }}
                  />
                </SpaceBetween>
              )}
            </SpaceBetween>
          </PageContent>
          <SpaceBetween size="s" vertical>
            <PageContent horizontalPadding>
              <h2>Pricing</h2>
            </PageContent>
            <VendorPricing />
          </SpaceBetween>
        </SpaceBetween>
      </SpaceBetween>
    </PageContent>
  );
};

const mediaThumbnails = () => {
  return [
    () => (
      <ClickableThumbnail
        img="https://placehold.co/1920x1080"
        title="58 images"
        onClick={() => alert("open images")}
        classes={{ root: styles.mediaThumb }}
      />
    ),
    () => (
      <ClickableThumbnail
        img="https://placehold.co/1920x1080"
        title="4 videos"
        onClick={() => alert("open videos")}
        classes={{ root: styles.mediaThumb }}
      />
    ),
  ];
};
