import express from "express";
import {
  CreateVendorListingController,
  GetAuthedVendorListingController,
  GetVendorListingController,
  SearchVendorListingsController,
  UpdateVendorListingController,
} from "../controllers/vendor";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { VendorAuth } from "../middleware/VendorAuth.middleware";

const router = express.Router();

router.post(
  APIRoute.Vendor.CreateVendorListing,
  VendorAuth,
  CreateVendorListingController
);
router.post(APIRoute.Vendor.GetVendorListing, GetVendorListingController);
router.post(APIRoute.Vendor.UpdateVendorListing, UpdateVendorListingController);
router.post(
  APIRoute.Vendor.SearchVendorListings,
  SearchVendorListingsController
);
router.post(
  APIRoute.Vendor.GetAuthedListing,
  VendorAuth,
  GetAuthedVendorListingController
);

export const vendorRouter = router;
