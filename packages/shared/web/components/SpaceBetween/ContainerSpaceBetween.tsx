import React from "react";
import { SpaceBetween, SpaceBetweenProps } from "./SpaceBetween";

type Props = Partial<SpaceBetweenProps>;

const defaults: SpaceBetweenProps = {
  vertical: true,
  size: "xxl",
  stretch: true,
  stretchChildren: true,
};

export const ContainerSpaceBetween = (props: Props) => {
  return <SpaceBetween {...defaults} {...props} />;
};
