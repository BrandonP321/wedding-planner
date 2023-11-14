import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorAccountModel } from "../../models/vendorAccount";

export namespace LoginVendorAccountRequest {
  export type ReqBody = Pick<VendorAccountModel.Base, "email" | "password">;

  export type ResBody = {
    accountId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    IncorrectEmailOrPassword: "IncorrectEmailOrPassword",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    [ErrorCodes.IncorrectEmailOrPassword]: {
      statusCode: 401,
      msg: "Incorrect email or password.",
      code: ErrorCodes.IncorrectEmailOrPassword,
    },
  } as const;

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
