import { APIErrorMap } from "@wedding-planner/shared/api/requests";
import { Response, Request, NextFunction } from "express";
import { ControllerErrors } from "./ControllerErrors";
import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";

export namespace Controller {
  export type HandlerCallback<ReqBody, ResBody, Locals extends object> = (
    req: Request<{}, ResBody, ReqBody, {}, {}>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ) => Promise<any>;

  export type HandlerCallbackWithErrors<
    ReqBody,
    ResBody,
    Locals extends object,
    Errors
  > = (
    req: Request<{}, ResBody, ReqBody, {}, {}>,
    res: Response<ResBody, Locals>,
    error: ControllerErrors.ErrorsMap<Errors>,
    next: NextFunction
  ) => Promise<any>;
}

export class Controller<
  ReqBody,
  ResBody,
  Locals extends object,
  Errors extends APIErrorMap<{}>
> {
  public errors: Errors;

  constructor(errors: Errors) {
    this.errors = errors;
  }

  public handler(
    cb: Controller.HandlerCallbackWithErrors<ReqBody, ResBody, Locals, Errors>
  ): Controller.HandlerCallback<ReqBody, ResBody, Locals> {
    return async (req, res, next) => {
      const errors = new ControllerErrors<Errors>(res, this.errors).error;
      try {
        await cb(req, res, errors, next);
      } catch (e) {
        const defaultErrors = new ControllerErrors(res, DefaultAPIError.Errors);

        return defaultErrors.error.InternalServerError(undefined, e);
      }
    };
  }
}
