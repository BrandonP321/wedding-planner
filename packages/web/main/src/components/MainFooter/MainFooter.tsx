import React from "react";
import styles from "./MainFooter.module.scss";
import { SpaceBetween } from "@wedding-planner/shared/web/components";
import { RouteHelper } from "utils/RouteHelper";
import { Link } from "react-router-dom";

export type MainFooterProps = {};

type FooterLink = {
  label: string;
  href: string;
};

const legalLinks: FooterLink[] = [
  { href: RouteHelper.PrivacyPolicy(), label: "Privacy" },
  { href: RouteHelper.PrivacyPolicy(), label: "Terms" },
];

const siteLinks: FooterLink[] = [
  { href: RouteHelper.Home(), label: "Vendor portal" },
  { href: RouteHelper.Home(), label: "Advertising" },
  { href: RouteHelper.Home(), label: "About" },
];

export const MainFooter = (props: MainFooterProps) => {
  return (
    <SpaceBetween
      classes={{ root: styles.footer }}
      size="l"
      responsiveSize={{ mobile: "m", tiny: "s" }}
    >
      <SpaceBetween>
        {siteLinks.map((l, i) => (
          <Link to={l.href} key={i}>
            {l.label}
          </Link>
        ))}
      </SpaceBetween>
      <SpaceBetween>
        {legalLinks.map((l, i) => (
          <Link to={l.href} key={i}>
            {l.label}
          </Link>
        ))}
      </SpaceBetween>
    </SpaceBetween>
  );
};
