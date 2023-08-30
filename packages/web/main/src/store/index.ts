import {
  AppLayoutActions,
  ResponsiveActions,
} from "@wedding-planner/shared/web/store";

export * from "./store";
export { useResponsive, useAppLayout } from "@wedding-planner/shared/web/store";

export const Actions = {
  ...ResponsiveActions,
  ...AppLayoutActions,
};
