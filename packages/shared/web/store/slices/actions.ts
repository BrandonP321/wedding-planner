import { appLayoutSlice } from "./appLayout/appLayoutSlice";
import { notificationsSlice } from "./notifications/notificationsSlice";
import { responsiveSlice } from "./responsive/responsiveSlice";

export const ResponsiveActions = { Responsive: responsiveSlice.actions };
export const AppLayoutActions = { AppLayout: appLayoutSlice.actions };
export const NotificationActions = {
  Notifications: notificationsSlice.actions,
};

export const SharedActions = {
  ...ResponsiveActions,
  ...AppLayoutActions,
  ...NotificationActions,
};
