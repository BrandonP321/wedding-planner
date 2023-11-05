import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { Vendor } from "../../../common/types";
import { VendorModel } from "../../models/vendor";
import { TypedOmit } from "../../../common";

export namespace CreateVendorListingRequest {
  export type ReqBody = {
    // vendor: Vendor.VendorWithoutIDs;
    vendor: TypedOmit<
      VendorModel.CreationOrUpdateAttributes,
      "locationGeometry"
    >;
    // TODO: Change to address after testing
    location: [number, number];
  };

  export type ResBody = {
    vendorId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  };

  export const Errors = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
