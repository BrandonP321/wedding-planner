import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";

export namespace AssociateVendorTempAssetsRequest {
  export type ReqBody = {
    assets: {
      /** Object key in AWS S3 */
      objectKey: string;
      showcaseOrder: number | null;
      isInShowcase: boolean;
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
