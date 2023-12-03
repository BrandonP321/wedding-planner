import { VendorAccountResLocals } from "../../middleware";
import { Controller } from "../../utils";
import { UpdateVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/UpdateVendorAccount.request";
import db from "../../models";

type ReqBody = UpdateVendorAccountRequest.ReqBody;

const controller = new Controller<
  ReqBody,
  UpdateVendorAccountRequest.ResBody,
  VendorAccountResLocals,
  typeof UpdateVendorAccountRequest.Errors
>(UpdateVendorAccountRequest.Errors);

export const UpdateVendorAccountController = controller.handler(
  async (req, res, errors) => {
    const body = req.body;
    const { vendorAccount } = res.locals;

    const request: ReqBody = {
      businessName: body.businessName,
      email: body.email,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
    };

    // Ensure email is not taken if changed
    if (request.email !== vendorAccount.dataValues.email) {
      const vendorAccountWithEmail = await db.VendorAccount.findOne({
        where: { email: request.email },
      });

      if (vendorAccountWithEmail) {
        return errors.EmailTaken();
      }
    }

    await vendorAccount.update(request);

    return res.json({}).end();
  }
);
