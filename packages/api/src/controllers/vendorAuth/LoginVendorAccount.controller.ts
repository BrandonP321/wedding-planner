import { LoginVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/LoginVendorAccount.request";
import { validateVendorLoginSchema } from "@wedding-planner/shared/common/schemas/VENDOR_LOGIN_SCHEMA";
import { Controller } from "../../utils/ControllerUtils";
import db from "../../models";
import { JWTUtils } from "../../utils";

const controller = new Controller<
  LoginVendorAccountRequest.ReqBody,
  LoginVendorAccountRequest.ResBody,
  {},
  typeof LoginVendorAccountRequest.Errors
>(LoginVendorAccountRequest.Errors);

export const LoginVendorAccountController = controller.handler(
  async (req, res, errors) => {
    const { email, password } = req.body;

    const inputError = await validateVendorLoginSchema({ email, password });

    if (inputError) return errors.InvalidInput(inputError);

    const account = await db.VendorAccount.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!account) return errors.IncorrectEmailOrPassword();

    const isPasswordValid = await account.validatePassword(password);
    if (!isPasswordValid) return errors.IncorrectEmailOrPassword();

    const { id } = account.dataValues;

    const { tokens } = await JWTUtils.generateAndSetTokens(
      JSON.stringify(id),
      res
    );

    if (!tokens) return errors.InternalServerError();

    return res.json({ accountId: id }).end();
  }
);
