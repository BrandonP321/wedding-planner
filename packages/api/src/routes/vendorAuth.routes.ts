import express from "express";
import {
  GetVendorAccountAuthStatusController,
  RegisterVendorAccountController,
} from "../controllers/vendorAuth";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { VendorAuth } from "../middleware";
import { LoginVendorAccountController } from "../controllers/vendorAuth/LoginVendorAccount.controller";
import { SignoutVendorAccountController } from "../controllers/vendorAuth/SignoutVendorAccount.controller";

const router = express.Router();

// Register
router.post(APIRoute.VendorAuth.Register, RegisterVendorAccountController);
// Login
router.post(APIRoute.VendorAuth.Login, LoginVendorAccountController);
// Signout
router.post(APIRoute.VendorAuth.Signout, SignoutVendorAccountController);
// Auth status
router.post(
  "/vendor-auth/status",
  VendorAuth,
  GetVendorAccountAuthStatusController
);

export const vendorAuthRouter = router;
