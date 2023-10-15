import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";

export namespace GetCitySuggestionsRequest {
  export type ReqBody = {
    query: string;
  };

  export type ResBody = {
    predictions: { city: string }[];
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  };

  export const Errors = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
