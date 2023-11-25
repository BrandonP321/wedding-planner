import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";
import { Controller, JWTResLocals } from "../utils";
import db from "../models";
import Vendor from "../models/vendor/vendor.model";

export type AuthedVendorResLocals = JWTResLocals & {
  vendor: Vendor;
  vendorId: number;
};

const controller = new Controller<
  {},
  {},
  AuthedVendorResLocals,
  typeof DefaultAPIError.Errors
>(DefaultAPIError.Errors);

export const GetAuthedVendor = controller.handler(
  async (req, res, errors, next) => {
    const { ownerId } = res.locals;

    const vendor = await db.Vendor.findOne({ where: { ownerId } });

    if (!vendor) {
      return errors.VendorNotFound();
    } else if (!vendor.validateOwnership(ownerId)) {
      return errors.UnauthorizedAccess();
    }

    res.locals.vendor = vendor;
    res.locals.vendorId = vendor.dataValues.id;

    next();
  }
);
