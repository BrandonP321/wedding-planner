import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorAccountModel } from "../../models/vendorAccount";

export namespace RegisterVendorAccountRequest {
  export type ReqBody = Pick<
    VendorAccountModel.Base,
    "businessName" | "email" | "fullName" | "password" | "phoneNumber"
  > & {
    passwordConfirm: string;
  };

  export type ResBody = {
    accountId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    EmailTaken: "EmailTaken",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    [ErrorCodes.EmailTaken]: {
      statusCode: 400,
      msg: "Email already in use",
      code: ErrorCodes.EmailTaken,
    },
  } as const;

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
