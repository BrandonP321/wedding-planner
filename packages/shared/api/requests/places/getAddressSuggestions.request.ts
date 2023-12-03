import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";

export namespace GetAddressSuggestionsRequest {
  export type ReqBody = {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };

  export type ResBody = {
    suggestions: {
      placeId: string;
      description: string;
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
