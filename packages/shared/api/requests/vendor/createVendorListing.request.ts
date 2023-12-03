import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";
import { DeepOmitKey } from "../../../common";

export namespace CreateVendorListingRequest {
  export type ReqBody = {
    vendor: VendorModel.CreationParams;
  };

  export type ResBody = {
    vendorId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    listingAlreadyExists: "listingAlreadyExists",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    [ErrorCodes.listingAlreadyExists]: {
      code: ErrorCodes.listingAlreadyExists,
      statusCode: 400,
      msg: "A listing already exists for this account",
    },
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
