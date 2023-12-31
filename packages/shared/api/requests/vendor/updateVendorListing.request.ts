import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";
import { DeepOmitKey } from "../../../common";

export namespace UpdateVendorListingRequest {
  export type ReqBody = {
    vendor: DeepOmitKey<
      VendorModel.UpdateParams,
      "ownerId" | "locationGeometry"
    >;
  };

  export type ResBody = {
    vendorId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
