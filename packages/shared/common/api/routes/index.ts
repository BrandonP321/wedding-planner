import { PlacesRoutes } from "./placesRoutes";
import { S3Routes } from "./s3Routes";
import { VendorAuthRoutes } from "./vendorAuthRoutes";
import { VendorRoutes } from "./vendorRoutes";

export const APIRoute = {
  Places: PlacesRoutes,
  Vendor: VendorRoutes,
  S3: S3Routes,
  VendorAuth: VendorAuthRoutes,
} as const;
