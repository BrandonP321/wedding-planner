import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorAccountModel } from "../../models/vendorAccount";

export namespace UpdateVendorAccountRequest {
  export type ReqBody = Pick<
    VendorAccountModel.Base,
    "businessName" | "email" | "fullName" | "phoneNumber"
  >;

  export type ResBody = {};

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    EmailTaken: "EmailTaken",
    IncorrectPassword: "IncorrectPassword",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    [ErrorCodes.EmailTaken]: {
      statusCode: 400,
      msg: "Email already in use by another account",
      code: ErrorCodes.EmailTaken,
    },
    [ErrorCodes.IncorrectPassword]: {
      statusCode: 401,
      msg: "Incorrect password was provided",
      code: ErrorCodes.EmailTaken,
    },
  } as const;

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
