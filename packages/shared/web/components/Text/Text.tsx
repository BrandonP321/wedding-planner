import React from "react";
import styles from "./Text.module.scss";
import { Size } from "../../utils";

type TextColor = "primary" | "secondary" | "accentPrimary" | "accentSecondary";

type Props = {
  color?: TextColor;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";
};

export const Text = ({ color = "primary", variant = "p" }: Props) => {
  const Tag = variant;

  return <Tag className={styles[color]}></Tag>;
};
