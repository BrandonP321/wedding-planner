import { RegisterVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/RegisterVendorAccount.request";
import { Controller } from "../../utils/ControllerUtils";
import db from "../../models";
import { JWTUtils } from "../../utils";
import { ValidationError } from "sequelize";

const controller = new Controller<
  RegisterVendorAccountRequest.ReqBody,
  RegisterVendorAccountRequest.ResBody,
  {},
  typeof RegisterVendorAccountRequest.Errors
>(RegisterVendorAccountRequest.Errors);

export const RegisterVendorAccountController = controller.handler(
  async (req, res, errors) => {
    const { email, ...account } = req.body;

    let isEmailTaken = false;

    const newAccount = await db.VendorAccount.create({
      email,
      ...account,
    }).catch((err: ValidationError) => {
      isEmailTaken = err.errors[0].path === "email";
    });

    if (isEmailTaken) {
      return errors.EmailTaken();
    } else if (!newAccount) {
      return errors.InternalServerError();
    }

    const { id } = newAccount.dataValues;

    const { tokens } = await JWTUtils.generateAndSetTokens(
      JSON.stringify(id),
      res
    );

    if (!tokens) return errors.InternalServerError();

    return res.json({ accountId: id }).end();
  }
);
