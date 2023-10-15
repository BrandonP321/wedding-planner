export * from "./HttpStatusCodes";

export type APIErrorConfig<ErrorCodes> = {
  statusCode: number;
  msg: string;
  code: keyof ErrorCodes;
};

export type APIErrorResponse<Errors> = {
  code: keyof Errors;
  msg: string;
};

export type APIErrorMap<Errors> = {
  [key in keyof Errors]: APIErrorConfig<Errors>;
};
