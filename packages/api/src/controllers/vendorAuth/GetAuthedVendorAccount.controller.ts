import { VendorAccountResLocals } from "../../middleware";
import { Controller } from "../../utils";
import { GetAuthedVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/GetAuthedVendorAccount.request";

const controller = new Controller<
  {},
  GetAuthedVendorAccountRequest.ResBody,
  VendorAccountResLocals,
  typeof GetAuthedVendorAccountRequest.Errors
>(GetAuthedVendorAccountRequest.Errors);

export const GetAuthedVendorAccountController = controller.handler(
  async (req, res, errors) => {
    const { vendorAccount } = res.locals;

    const response = vendorAccount.toJSON();

    return res.json(response).end();
  }
);
