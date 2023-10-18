import {
  APIErrorConfig,
  APIErrorMap,
  APIErrorResponse,
} from "@wedding-planner/shared/api/requests";
import { Stage } from "@wedding-planner/shared/common/types/environment";
import { Response } from "express";

export namespace ControllerErrors {
  export type ErrorsMap<Errors> = {
    [key in keyof Errors]: (msg?: string, err?: any) => Response;
  };
}

export class ControllerErrors<Errors extends APIErrorMap<{}>> {
  public error: ControllerErrors.ErrorsMap<Errors> = {} as typeof this.error;

  constructor(res: Response, errors: Errors) {
    for (const errorKey in errors) {
      const error = errors[errorKey] as APIErrorConfig<any>;

      this.error[errorKey] = (msg, err) => {
        const resJSON: APIErrorResponse<Errors> = {
          code: error.code as keyof Errors,
          msg: msg ?? error.msg,
        };

        ControllerErrors.logError(err);

        return res.status(error.statusCode).json(resJSON).end();
      };
    }
  }

  public static logError = (err: any) => {
    if (err) {
      if (process.env.STAGE === Stage.LOCAL) {
        return console.error(err);
      } else if (typeof err !== "string") {
        err = JSON.stringify(err);
      }

      // TODO: Log errors to CloudWatch
      // Logger.error(err);
    }
  };
}
