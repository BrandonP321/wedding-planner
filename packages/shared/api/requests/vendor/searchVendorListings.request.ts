import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";
import { Vendor, VendorFilterTypes } from "../../../common/types";

export namespace SearchVendorListingRequest {
  export type ReqBody = VendorFilterTypes.Filters & {
    // TODO: Change to city after testing
    location: [number, number];
    distanceFromLocation: number;
  };

  export type ResBody = {
    // TODO: Slim down this response to only include the necessary fields
    vendors: VendorModel.APIResponse.Populated[];
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
