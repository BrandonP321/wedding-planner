import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";
import { Response } from "express";
import { JWTResLocals, JWTUtils } from "../utils/JWTUtils";
import db from "../models";
import { Controller, ControllerErrors } from "../utils";

const controller = new Controller<
  {},
  {},
  JWTResLocals,
  typeof DefaultAPIError.Errors
>(DefaultAPIError.Errors);

type TErrors = ControllerErrors.ErrorsMap<(typeof DefaultAPIError)["Codes"]>;

const haveUserReAuth = (res: Response, errors: TErrors, errMsg?: string) => {
  return errors.NotAuthenticated(errMsg);
};

/** Middleware for protected API endpoints.  Authenticates user via JWTs sent in request header */
export const VendorAuth = controller.handler(async (req, res, errors, next) => {
  try {
    const authTokens = JWTUtils.getTokensFromCookie(req);

    // if no tokens found, have user re-auth
    if (!authTokens) {
      return haveUserReAuth(res, errors, "No auth tokens found");
    }

    // validate & decode tokens
    const aToken = JWTUtils.verifyAccessToken(authTokens.aToken);
    const rToken = JWTUtils.verifyRefreshToken(authTokens.rToken);

    // if token couldn't be verified or refresh token is expired, have user re-auth
    if (!aToken || !rToken || rToken.isExpired) {
      return haveUserReAuth(res, errors, "Expired refresh token");
    }

    // if access token is expired, validate jwt id on tokens against jwt IDs stored on user's db document
    if (aToken.isExpired) {
      const areTokensRefreshed = await refreshTokens(rToken.ownerId, res);

      if (!areTokensRefreshed) {
        return haveUserReAuth(res, errors, "Unable to refresh tokens");
      }
    } else {
      // if token doesn't need to be refreshed, ensure no cached token is being sent in response header
      res.setHeader("authorization", "");
    }

    // make user's id accessible to other controllers & middleware
    res.locals = { ownerId: parseInt(aToken.ownerId) };

    next();
  } catch (err) {
    return haveUserReAuth(res, errors, "Unable to validate user authorization");
  }
});

/**
 * Refreshes access & refresh tokens
 * @returns true or false depending on whether tokens were successfully refreshed
 */
const refreshTokens = async (
  // TODO: Implement hash to verify each access token has one and only one refresh token
  // aTokenHash: string,
  // rTokenHash: string,
  userId: string,
  res: Response
) => {
  try {
    const vendor = await db.VendorAccount.findOne({ where: { id: userId } });

    if (!vendor) {
      return false;
    }

    // verify jwt id stored on tokens is a valid id stored on user's db document
    const isRefreshAllowed = vendor;
    // TODO: use commented code below after adding jwtHash to vendorAccount model
    // user && aTokenHash === rTokenHash && user.jwtHash?.[rTokenHash];

    if (!isRefreshAllowed) {
      return false;
    }

    // generate and store tokens in reponse header
    const { tokens: newTokens } = await JWTUtils.generateAndSetTokens(
      userId,
      res
    );

    if (!newTokens) {
      return false;
    }

    // remove old jwt id from user doc
    // await user.removeJWTHash(rTokenHash);
    // add enw jwt id to user doc
    // await user.addJWTHash(tokenHashId);
    // await user.save()

    return true;
  } catch (err) {
    return false;
  }
};
