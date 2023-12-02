import db from "../../models";
import { Controller, JWTResLocals } from "../../utils";
import { UpdateVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/UpdateVendorAccount.request";

type ReqBody = UpdateVendorAccountRequest.ReqBody;

const controller = new Controller<
  ReqBody,
  UpdateVendorAccountRequest.ResBody,
  JWTResLocals,
  typeof UpdateVendorAccountRequest.Errors
>(UpdateVendorAccountRequest.Errors);

export const UpdateVendorAccountController = controller.handler(
  async (req, res, errors) => {
    const body = req.body;
    const { ownerId } = res.locals;

    const request: ReqBody = {
      businessName: body.businessName,
      email: body.email,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
    };

    const vendorAccount = await db.VendorAccount.findOne({
      where: { id: ownerId },
    });

    if (!vendorAccount) {
      return errors.VendorNotFound("Account not found");
    }

    await vendorAccount.update(request);

    return res.json({}).end();
  }
);
