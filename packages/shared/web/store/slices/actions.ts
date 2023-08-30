import { appLayoutSlice } from "./appLayout/appLayoutSlice";
import { responsiveSlice } from "./responsive/responsiveSlice";

export const ResponsiveActions = { Responsive: responsiveSlice.actions };
export const AppLayoutActions = { AppLayout: appLayoutSlice.actions };

export const SharedActions = {
  ...ResponsiveActions,
  ...AppLayoutActions,
};
