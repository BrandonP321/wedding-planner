import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { MainChoiceModel } from "../../models/mainChoice";

export namespace UpdateMainChoicesRequest {
  export type ReqBody = {
    mainChoices: MainChoiceModel.CreationParams[];
  };

  export type ResBody = {};

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    VendorNotFound: "VendorNotFound",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    VendorNotFound: {
      code: ErrorCodes.VendorNotFound,
      msg: "Vendor not found",
      statusCode: 404,
    },
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
