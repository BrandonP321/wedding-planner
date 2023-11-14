import { Stage } from "@wedding-planner/shared/common/types/environment";
import bcrypt from "bcrypt";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
// import { Logger } from "./LoggerUtils";

export type JWTResLocals = {
  ownerId: number;
};

type TAuthTokens = {
  aToken: string;
  rToken: string;
};

const authTokenCookieName = "authTokens";
const accessTokenExpirationHours = 1;
const refreshTokenExpirationHours = 24;

const accessTokenExpirationMs = accessTokenExpirationHours * 60 * 60 * 1000;
const refreshTokenExpirationMs = refreshTokenExpirationHours * 60 * 60 * 1000;

/**
 * JWT utility class with commented out methods that were used when JWTs were stored in http cookies.  Am leaving this code commented out to serve
 * as a representation of how JWTs should be implemented if the server and website were on the same domain and cross-site cookies could be used.
 */
export class JWTUtils {
  private static authCookieOptions = (maxAge?: number): CookieOptions => ({
    httpOnly: true,
    secure: process.env.STAGE !== Stage.LOCAL,
    maxAge,
    sameSite: process.env.STAGE !== Stage.LOCAL,
  });

  /** Stores access & refresh tokens in http secured cookies */
  public static generateTokenCookies = (tokens: TAuthTokens, res: Response) => {
    res.cookie(
      authTokenCookieName,
      JSON.stringify(tokens),
      this.authCookieOptions(refreshTokenExpirationMs)
    );
  };

  /** Gets JWT auth cookie, returning undefined if no cookie exists */
  public static getTokensFromCookie = (req: Request) => {
    const cookie: undefined | string = req.cookies?.[authTokenCookieName];
    const parsedCookie: undefined | TAuthTokens = cookie && JSON.parse(cookie);

    return parsedCookie;
  };

  public static getTokensFromHeader = (req: Request) => {
    try {
      const tokens = req.headers.authorization;
      const parsedTokens: TAuthTokens | undefined =
        tokens && JSON.parse(tokens);

      return parsedTokens;
    } catch (err) {
      return undefined;
    }
  };

  public static destroyTokenCookie = (res: Response) => {
    res.clearCookie(authTokenCookieName, this.authCookieOptions());
  };

  /** Returns new access & refresh tokens */
  public static generateTokens = (ownerId: string) => {
    try {
      const aToken = this.getSignedAccessToken(ownerId);
      const rToken = this.getSignedRefreshToken(ownerId);

      return { aToken, rToken };
    } catch (err) {
      // TODO: Uncomment after adding logger
      // Logger.error(err);
      console.error(err);

      return undefined;
    }
  };

  /** Generates auth tokens and sets them in the response header */
  public static generateAndSetTokens = async (
    ownerId: string,
    res: Response
  ) => {
    const authTokens = this.generateTokens(ownerId);

    if (authTokens) {
      this.generateTokenCookies(authTokens, res);
    }

    return { tokens: authTokens };
  };

  public static getSignedAccessToken = (ownerId: string) => {
    return this.signToken(
      ownerId,
      process.env.ACCESS_TOKEN_SECRET ?? "",
      `${accessTokenExpirationHours}h`
    );
  };

  public static getSignedRefreshToken = (ownerId: string) => {
    return this.signToken(
      ownerId,
      process.env.REFRESH_TOKEN_SECRET ?? "",
      `${refreshTokenExpirationHours}h`
    );
  };

  public static signToken = (
    ownerId: string,
    secret: string,
    expiresIn: string
  ) => {
    return jwt.sign({}, secret, {
      subject: ownerId,
      expiresIn,
    });
  };

  public static verifyAccessToken = (token: string) => {
    return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET ?? "");
  };

  public static verifyRefreshToken = (token: string) => {
    return this.verifyToken(token, process.env.REFRESH_TOKEN_SECRET ?? "");
  };

  /**
   * Verifies & decodes JWT
   * @param token JWT
   * @param secret Secret hash used to validate token
   * @returns Decoded JWT with it's expiration status
   */
  public static verifyToken = (token: string, secret: string) => {
    const decodedToken = jwt.decode(token);

    let isExpired = false;

    try {
      // verify that token is still valid & not expired
      jwt.verify(token, secret);
    } catch (err) {
      // if error is thrown while verifying jwt, token is expired
      isExpired = true;
    }

    // if either the token couldn't be verified or sub/jti payload properties are undefined, return undefined
    if (
      typeof decodedToken === "string" ||
      !decodedToken ||
      !decodedToken.sub
    ) {
      return undefined;
    }

    return {
      token: decodedToken,
      isExpired,
      ownerId: decodedToken.sub,
    };
  };
}
