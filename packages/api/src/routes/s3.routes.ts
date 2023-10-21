import express from "express";
import { GetS3PresignedUrlForVendorImageUploadController } from "../controllers/s3";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";

const router = express.Router();

router.post(
  APIRoute.S3.GetVendorImageUploadPresignedUrl,
  GetS3PresignedUrlForVendorImageUploadController
);

export const s3Router = router;
