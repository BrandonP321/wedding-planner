import {
  AppLayoutActions,
  NotificationActions,
  ResponsiveActions,
} from "@wedding-planner/shared/web/store";

export * from "./store";
export {
  useResponsive,
  useAppLayout,
  useNotifications,
  useFetch,
} from "@wedding-planner/shared/web/store";

export const Actions = {
  ...ResponsiveActions,
  ...AppLayoutActions,
  ...NotificationActions,
};
