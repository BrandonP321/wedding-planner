import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";

export namespace GetS3PresignedUrlForVendorImageUploadRequest {
  export type ReqBody = {
    imageNames: string[];
  };

  export type ResBody = {
    signedURLs: {
      signedUrl: string;
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
