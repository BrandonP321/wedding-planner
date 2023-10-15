import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";

export namespace GetVendorListingRequest {
  export type ReqBody = {
    vendorId: number;
  };

  export type ResBody = {
    vendor: VendorModel.APIResponse.Populated;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    VendorNotFound: "VendorNotFound",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    VendorNotFound: {
      code: ErrorCodes.VendorNotFound,
      msg: "Vendor not found",
      statusCode: 404,
    },
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
