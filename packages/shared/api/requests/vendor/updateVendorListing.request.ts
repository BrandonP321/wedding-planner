import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";
import { DeepOmitKey } from "../../../common";

export namespace UpdateVendorListingRequest {
  export type ReqBody = {
    location: [number, number];
    // TODO: Remove creation attributes after implementing grabbing coords from address
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
    VendorNotFound: "VendorNotFound",
    UnauthorizedAccess: "UnauthorizedAccess",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    VendorNotFound: {
      code: ErrorCodes.VendorNotFound,
      msg: "Vendor not found",
      statusCode: 404,
    },
    UnauthorizedAccess: {
      code: ErrorCodes.UnauthorizedAccess,
      msg: "You are unauthorized to modify this listing",
      statusCode: 401,
    },
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
