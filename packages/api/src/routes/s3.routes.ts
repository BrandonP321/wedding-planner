import express from "express";
import { GetS3PresignedUrlForVendorImageUploadController } from "../controllers/s3";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { AssociateVendorTempAssetsController } from "../controllers/s3/associateVendorTempAssets.controller";

const router = express.Router();

router.post(
  APIRoute.S3.GetVendorImageUploadPresignedUrl,
  GetS3PresignedUrlForVendorImageUploadController
);

router.post(
  APIRoute.S3.AssociateVendorTempAssets,
  AssociateVendorTempAssetsController
);

export const s3Router = router;
