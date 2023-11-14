import { Controller } from "../../utils/ControllerUtils";
import { JWTResLocals, JWTUtils } from "../../utils";
import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";

type ReqBody = {};

type ResBody = {
  isAuthenticated: boolean;
  id: number;
};

const controller = new Controller<
  ReqBody,
  ResBody,
  JWTResLocals,
  typeof DefaultAPIError.Errors
>(DefaultAPIError.Errors);

export const GetVendorAccountAuthStatusController = controller.handler(
  async (req, res, errors) => {
    const { ownerId } = res.locals;

    return res.json({ id: ownerId, isAuthenticated: true }).end();
  }
);
