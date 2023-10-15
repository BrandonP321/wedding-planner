import { APIErrorMap, APIErrorResponse } from ".";

export namespace DefaultAPIError {
  export const Codes = {
    InternalServerError: "InternalServerError",
    NotAuthenticated: "NotAuthenticated",
    NetworkError: "NetworkError",
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
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}
