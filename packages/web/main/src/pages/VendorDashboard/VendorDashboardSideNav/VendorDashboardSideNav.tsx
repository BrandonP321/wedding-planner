import React from "react";
import styles from "./VendorDashboardSideNav.module.scss";
import { Link, useLocation } from "react-router-dom";
import { RouteHelper } from "utils/RouteHelper";
import { SpaceBetween } from "@wedding-planner/shared";
import classNames from "classnames";

const links: { href: string; label: string }[] = [
  { href: RouteHelper.VendorDashboard.Listing(), label: "Listing" },
  { href: RouteHelper.VendorDashboard.Pricing(), label: "Pricing" },
  { href: RouteHelper.VendorDashboard.Images(), label: "Images" },
  { href: RouteHelper.VendorDashboard.Account(), label: "Account" },
];

export type VendorDashboardSideNavProps = {};

export const VendorDashboardSideNav = (props: VendorDashboardSideNavProps) => {
  return (
    <SpaceBetween
      size="n"
      classes={{ root: styles.sideNav }}
      vertical
      stretchChildren
    >
      {links.map((l, i) => (
        <SideNavLink key={i} href={l.href}>
          {l.label}
        </SideNavLink>
      ))}
    </SpaceBetween>
  );
};

type SideNavLinkProps = React.PropsWithChildren<{
  href: string;
}>;

const SideNavLink = ({ href, children }: SideNavLinkProps) => {
  const { pathname } = useLocation();

  const isSelected = pathname === href;

  return (
    <Link
      to={href}
      className={classNames(styles.link, isSelected && styles.selected)}
    >
      {children}
    </Link>
  );
};
