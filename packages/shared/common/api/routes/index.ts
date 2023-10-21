import { PlacesRoutes } from "./placesRoutes";
import { S3Routes } from "./seRoutes";
import { VendorRoutes } from "./vendorRoutes";

export const APIRoute = {
  Places: PlacesRoutes,
  Vendor: VendorRoutes,
  S3: S3Routes,
} as const;
