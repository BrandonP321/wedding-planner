import React from "react";
import {
  SpaceBetween,
  SpaceBetweenProps,
} from "@wedding-planner/shared/web/components/SpaceBetween/SpaceBetween";

export type CustomSpaceBetweenProps = Partial<SpaceBetweenProps>;

export const FormSpaceBetween = (props: CustomSpaceBetweenProps) => {
  return <SpaceBetween size="m" vertical {...props} />;
};
