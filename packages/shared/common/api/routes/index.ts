import { PlacesRoutes } from "./placesRoutes";
import { VendorRoutes } from "./vendorRoutes";

export const APIRoute = {
  Places: PlacesRoutes,
  Vendor: VendorRoutes,
} as const;
