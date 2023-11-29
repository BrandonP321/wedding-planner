import React, { useMemo } from "react";
import styles from "./Header.module.scss";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

type HeaderVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeaderProps = {
  title: string;
  description?: string;
  variant?: HeaderVariant;
};

export const Header = ({ title, description, variant = "h1" }: HeaderProps) => {
  const Title = useMemo(() => {
    const Tag = variant;

    return () => <Tag>{title}</Tag>;
  }, [title]);

  return (
    <SpaceBetween size="xxs" vertical stretch>
      <Title />
      {description && <p className={styles.description}>{description}</p>}
    </SpaceBetween>
  );
};
