import React from "react";
import styles from "./VendorLinks.module.scss";
import { SpaceBetween } from "@wedding-planner/shared/web/components";

export type VendorLinksProps = {};

const tempSocialIcon =
  "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/640px-Facebook_f_logo_%282021%29.svg.png";

const otherLinks = [
  { url: "https://www.google.com", name: "Website" },
  { url: "https://www.google.com", name: "Portfolio" },
];

export const VendorLinks = (props: VendorLinksProps) => {
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
          <img src={tempSocialIcon} alt="facebook" className={styles.icon} />
          <img src={tempSocialIcon} alt="instagram" className={styles.icon} />
          <img src={tempSocialIcon} alt="twitter" className={styles.icon} />
        </SpaceBetween>
      </SpaceBetween>

      <SpaceBetween classes={{ root: styles.links }} vertical size="xs">
        <SpaceBetween responsiveVertical={{ medium: false }} vertical>
          {otherLinks.map((link, i) => (
            <a
              href={link.url}
              key={i}
              className={styles.otherLink}
              target="_blank"
              rel="noreferrer"
            >
              {link.name}
            </a>
          ))}
        </SpaceBetween>
      </SpaceBetween>
    </SpaceBetween>
  );
};
