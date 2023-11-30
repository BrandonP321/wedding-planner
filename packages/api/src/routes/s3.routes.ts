import express from "express";
import { GetS3PresignedUrlForVendorImageUploadController } from "../controllers/s3";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { AssociateVendorTempAssetsController } from "../controllers/s3/associateVendorTempAssets.controller";
import { VendorAuth } from "../middleware";
import { GetAuthedVendor } from "../middleware/GetAuthedVendor.middleware";

const router = express.Router();

router.post(
  APIRoute.S3.GetVendorImageUploadPresignedUrl,
  VendorAuth,
  GetAuthedVendor,
  GetS3PresignedUrlForVendorImageUploadController
);

router.post(
  APIRoute.S3.AssociateVendorTempAssets,
  VendorAuth,
  GetAuthedVendor,
  AssociateVendorTempAssetsController
);

export const s3Router = router;
