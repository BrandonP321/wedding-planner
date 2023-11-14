import { Controller } from "../../utils/ControllerUtils";
import { JWTUtils } from "../../utils";
import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";

const controller = new Controller<{}, {}, {}, typeof DefaultAPIError.Errors>(
  DefaultAPIError.Errors
);

export const SignoutVendorAccountController = controller.handler(
  async (req, res, errors) => {
    JWTUtils.destroyTokenCookie(res);

    return res.json({}).end();
  }
);
