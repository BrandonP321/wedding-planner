import express from "express";
import {
  CreateVendorListingController,
  GetVendorListingController,
} from "../controllers/vendor";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";

const router = express.Router();

router.post(APIRoute.Vendor.CreateVendorListing, CreateVendorListingController);
router.post(APIRoute.Vendor.GetVendorListing, GetVendorListingController);

export const vendorRouter = router;
