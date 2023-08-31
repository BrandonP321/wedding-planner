import React from "react";
import styles from "./AppHelmet.module.scss";
import {
  UnifiedAppHelmet,
  SEOData,
} from "@wedding-planner/shared/web/components";

const defaultValues: SEOData = {
  title: "Some title",
  desc: "Some desc",
  image: "",
  imageAltText: "Some alt text",
};

export type AppHelmetProps = Partial<SEOData> & {};

const tempAppName = "My App";

export const AppHelmet = (props: AppHelmetProps) => {
  const { title } = props;

  return (
    <UnifiedAppHelmet
      prodDomain="https://some.domain"
      defaultValues={defaultValues}
      values={{
        ...props,
        title: `${title ? `${title} | ` : ""}${tempAppName}`,
      }}
    />
  );
};
