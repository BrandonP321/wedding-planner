import { APIErrorMap, APIErrorResponse } from ".";

export namespace DefaultAPIError {
  export const Codes = {
    InternalServerError: "InternalServerError",
    NotAuthenticated: "NotAuthenticated",
    NetworkError: "NetworkError",
    VendorNotFound: "VendorNotFound",
    VendorAccountNotFound: "VendorAccountNotFound",
    UnauthorizedAccess: "UnauthorizedAccess",
    InvalidInput: "InvalidInput",
  } as const;

  export const Errors: APIErrorMap<typeof Codes> = {
    InternalServerError: {
      statusCode: 500,
      msg: "Internal Server Error",
      code: Codes.InternalServerError,
    },
    NotAuthenticated: {
      statusCode: 401,
      msg: "Not Authenticated",
      code: Codes.NotAuthenticated,
    },
    NetworkError: {
      statusCode: 500,
      msg: "Network Error",
      code: Codes.NetworkError,
    },
    VendorNotFound: {
      code: Codes.VendorNotFound,
      msg: "Vendor not found",
      statusCode: 404,
    },
    VendorAccountNotFound: {
      code: Codes.VendorAccountNotFound,
      msg: "Vendor account not found",
      statusCode: 404,
    },
    UnauthorizedAccess: {
      code: Codes.UnauthorizedAccess,
      msg: "You are unauthorized to modify this listing",
      statusCode: 401,
    },
    InvalidInput: {
      code: Codes.InvalidInput,
      msg: "Invalid input",
      statusCode: 400,
    },
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
