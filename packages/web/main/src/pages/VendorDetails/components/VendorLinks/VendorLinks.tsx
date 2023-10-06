import React from "react";
import styles from "./VendorLinks.module.scss";
import {
  ExternalLink,
  SpaceBetween,
  SocialMediaIcons,
} from "@wedding-planner/shared/web/components";
import { useVendor } from "store";

export type VendorLinksProps = {};

const otherLinks = [
  { url: "https://www.google.com", name: "Website" },
  { url: "https://www.google.com", name: "Portfolio" },
];

export const VendorLinks = (props: VendorLinksProps) => {
  const { vendor } = useVendor();

  return (
    <SpaceBetween
      classes={{ root: styles.linksWrapper }}
      responsiveAlign={{ medium: "start" }}
      responsiveSize={{ medium: "xs" }}
      responsiveVertical={{ medium: false, mobile: true }}
      vertical
    >
      <SpaceBetween classes={{ root: styles.links }} vertical>
        <SpaceBetween>
          {vendor?.socialMediaLinks?.map((link, i) => {
            const Icon = SocialMediaIcons[link.type];

            return (
              <a
                href={link.url}
                key={i}
                target="_blank"
                rel="noreferrer"
                className={styles.icon}
              >
                <Icon />
              </a>
            );
          })}
        </SpaceBetween>
      </SpaceBetween>

      <SpaceBetween classes={{ root: styles.links }} vertical size="xs">
        <SpaceBetween responsiveVertical={{ medium: false }} vertical>
          {otherLinks.map((link, i) => (
            <ExternalLink
              to={link.url}
              key={i}
              classes={{ root: styles.otherLink }}
              target="_blank"
              rel="noreferrer"
            >
              {link.name}
            </ExternalLink>
          ))}
        </SpaceBetween>
      </SpaceBetween>
    </SpaceBetween>
  );
};
