import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";

export namespace GetAddressDetailsRequest {
  export type ReqBody = {
    placeId: string;
  };

  export type ResBody = {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  };

  export const Errors = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
