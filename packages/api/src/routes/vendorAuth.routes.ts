import express from "express";
import {
  GetVendorAccountAuthStatusController,
  RegisterVendorAccountController,
  UpdateVendorAccountController,
} from "../controllers/vendorAuth";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { GetAuthedVendorAccountMiddleware, VendorAuth } from "../middleware";
import { LoginVendorAccountController } from "../controllers/vendorAuth/LoginVendorAccount.controller";
import { SignoutVendorAccountController } from "../controllers/vendorAuth/SignoutVendorAccount.controller";
import { GetAuthedVendorAccountController } from "../controllers/vendorAuth/GetAuthedVendorAccount.controller";

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
// Update account
router.post(
  APIRoute.VendorAuth.UpdateAccount,
  VendorAuth,
  GetAuthedVendorAccountMiddleware,
  UpdateVendorAccountController
);
// Get authed account
router.post(
  APIRoute.VendorAuth.GetAuthedAccount,
  VendorAuth,
  GetAuthedVendorAccountMiddleware,
  GetAuthedVendorAccountController
);

export const vendorAuthRouter = router;
