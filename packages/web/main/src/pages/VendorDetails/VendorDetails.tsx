import React, { useEffect, useState } from "react";
import styles from "./VendorDetails.module.scss";
import { mockPhotographer } from "mockData/mockPhotographer";
import { useParams } from "react-router-dom";
import { WebMainRouteHelper } from "@wedding-planner/shared";
import {
  AspectRatioContent,
  ClickableThumbnail,
  Line,
  ListSpaceBetween,
  MediaCarousel,
  PageContent,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import { VendorPricing } from "components";
import { useResponsive } from "@wedding-planner/shared/web/store";
import { VendorLinks } from "./components/VendorLinks/VendorLinks";
import { Actions, useAppDispatch, useVendor } from "store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/pro-solid-svg-icons";

export type VendorDetailsProps = {};

export const VendorDetails = (props: VendorDetailsProps) => {
  const { vendorId } = useParams<WebMainRouteHelper.VendorDetails.UrlParams>();
  const { medium } = useResponsive();
  const dispatch = useAppDispatch();
  const { vendor } = useVendor();

  const [packagePrice, setPackagePrice] = useState(0);

  useEffect(() => {
    dispatch(Actions.Vendor.setVendor({ vendor: mockPhotographer }));
  });

  return (
    <PageContent
      bottomPadding
      topPadding
      responsiveTopPadding={{ large: false }}
    >
      <SpaceBetween size="s" vertical stretchChildren>
        <PageContent>
          <AspectRatioContent>
            <MediaCarousel
              slides={vendor?.media ?? []}
              classes={{
                root: styles.showcaseCarouselRoot,
                carousel: styles.showcaseCarousel,
              }}
            />
          </AspectRatioContent>
        </PageContent>

        <SpaceBetween size="xxl" vertical>
          <PageContent horizontalPadding>
            <SpaceBetween
              responsiveSize={{ medium: "l" }}
              size="s"
              vertical
              stretchChildren
              align="start"
            >
              <SpaceBetween
                size="n"
                responsiveSize={{ medium: "n" }}
                stretchChildren
                vertical
              >
                <h1>{vendor?.name}</h1>
                {medium && <VendorLinks />}
              </SpaceBetween>

              <SpaceBetween
                size="n"
                responsiveStretchChildren={{ medium: true }}
                vertical
              >
                <SpaceBetween wrap={false}>
                  <SpaceBetween size="m" wrap={false} vertical stretchChildren>
                    <div>
                      <h3>About this photographer</h3>
                      <p className={styles.description}>
                        {vendor?.description}
                      </p>
                    </div>

                    <SpaceBetween size="xs" vertical>
                      <h3>Media</h3>
                      <ListSpaceBetween
                        size="m"
                        stretch
                        itemsPerRow={2}
                        responsiveItemsPerRow={{ tiny: 1 }}
                        responsiveSize={{ mobile: "s" }}
                      >
                        <SpaceBetweenListItem>
                          <ClickableThumbnail
                            img={vendor?.media?.[0]?.url ?? ""}
                            title={
                              <>
                                <FontAwesomeIcon icon={faCamera} /> 58 images
                              </>
                            }
                            onClick={() => alert("open images")}
                            classes={{ root: styles.mediaThumb }}
                          />
                        </SpaceBetweenListItem>
                        <SpaceBetweenListItem>
                          <ClickableThumbnail
                            img={vendor?.media?.[0]?.url ?? ""}
                            title={
                              <>
                                <FontAwesomeIcon icon={faVideo} /> 4 videos
                              </>
                            }
                            onClick={() => alert("open videos")}
                            classes={{ root: styles.mediaThumb }}
                          />
                        </SpaceBetweenListItem>
                      </ListSpaceBetween>
                    </SpaceBetween>
                  </SpaceBetween>

                  {!medium && (
                    <>
                      <Line vertical />
                      <VendorLinks />
                    </>
                  )}
                </SpaceBetween>
              </SpaceBetween>
            </SpaceBetween>
          </PageContent>

          <SpaceBetween size="s" vertical stretch>
            <PageContent horizontalPadding stretch>
              <h2>Pricing</h2>
            </PageContent>
            <VendorPricing onPriceChange={setPackagePrice} />
          </SpaceBetween>
        </SpaceBetween>
      </SpaceBetween>
    </PageContent>
  );
};
