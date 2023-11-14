import express from "express";
import {
  GetVendorAccountAuthStatusController,
  RegisterVendorAccountController,
} from "../controllers/vendorAuth";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { VendorAuth } from "../middleware";
import { LoginVendorAccountController } from "../controllers/vendorAuth/LoginVendorAccount.controller";

const router = express.Router();

router.post(APIRoute.VendorAuth.Register, RegisterVendorAccountController);

router.post(APIRoute.VendorAuth.Login, LoginVendorAccountController);

router.post(
  "/vendor-auth/status",
  VendorAuth,
  GetVendorAccountAuthStatusController
);

export const vendorAuthRouter = router;
