import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";
import { Vendor } from "../../../common/types";

export namespace UpdateVendorListingRequest {
  export type ReqBody = {
    vendor: Vendor.VendorWithOptionalIDs;
  };

  export type ResBody = {
    vendorId: number;
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
