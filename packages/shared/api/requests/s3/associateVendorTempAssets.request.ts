import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";

export namespace AssociateVendorTempAssetsRequest {
  export type ReqBody = {
    assets: {
      objectKey: string;
      order: number;
    }[];
  };

  export type ResBody = {
    unsuccessfulAssociations: {
      objectKey: string;
    }[];
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  };

  export const Errors = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
