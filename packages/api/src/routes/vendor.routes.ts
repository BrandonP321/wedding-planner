import express from "express";
import {
  CreateVendorListingController,
  GetVendorListingController,
  UpdateVendorListingController,
} from "../controllers/vendor";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";

const router = express.Router();

router.post(APIRoute.Vendor.CreateVendorListing, CreateVendorListingController);
router.post(APIRoute.Vendor.GetVendorListing, GetVendorListingController);
router.post(APIRoute.Vendor.UpdateVendorListing, UpdateVendorListingController);

export const vendorRouter = router;
