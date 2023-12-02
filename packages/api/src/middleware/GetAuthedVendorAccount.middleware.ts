import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";
import db from "../models";
import { Controller, JWTResLocals } from "../utils";
import VendorAccount from "../models/vendorAccount/vendorAccount.model";

export type VendorAccountResLocals = JWTResLocals & {
  accountId: number;
  vendorAccount: VendorAccount;
};

const controller = new Controller<
  {},
  {},
  VendorAccountResLocals,
  typeof DefaultAPIError.Errors
>(DefaultAPIError.Errors);

export const GetAuthedVendorAccountMiddleware = controller.handler(
  async (req, res, errors, next) => {
    const { ownerId } = res.locals;

    const vendorAccount = await db.VendorAccount.findOne({
      where: { id: ownerId },
    });

    if (!vendorAccount) {
      return errors.VendorAccountNotFound();
    }

    res.locals.accountId = vendorAccount.dataValues.id;
    res.locals.vendorAccount = vendorAccount;

    next();
  }
);
