import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorAccountModel } from "../../models/vendorAccount";

export namespace GetAuthedVendorAccountRequest {
  export type ResBody = VendorAccountModel.Response;

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
  } as const;

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
