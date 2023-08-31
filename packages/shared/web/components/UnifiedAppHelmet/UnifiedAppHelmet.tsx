import React from "react";
import styles from "./UnifiedAppHelmet.module.scss";
import { Helmet } from "react-helmet-async";

export type SEOData = {
  title: string;
  desc: string;
  image: string;
  imageAltText: string;
};

export type UnifiedAppHelmetProps = {
  defaultValues: SEOData;
  values: Partial<SEOData>;
  prodDomain: string;
};

export const UnifiedAppHelmet = ({
  defaultValues,
  values,
  prodDomain,
}: UnifiedAppHelmetProps) => {
  const meta = {
    ...defaultValues,
    ...values,
  };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.desc} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:alt" content={meta.imageAltText} />

      <link rel="canonical" href={prodDomain} />
    </Helmet>
  );
};
