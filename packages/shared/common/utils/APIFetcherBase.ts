import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpStatusCode } from "../../api/requests";
import { Stage } from "../types/environment";

// TODO: Move this to a separate file
// ==============================

export type APIErrorResponse<Codes extends {}> = {
  errCode: keyof Codes;
  msg: string;
};

export type APIControllerResponse<Codes extends {}> = {
  status: number;
  msg: string;
  errCode: keyof Codes;
};

export type APIErrors<T extends {}> = {
  [key in keyof T]: APIControllerResponse<T>;
};

export namespace DefaultErrors {
  export const ErrorCode = {
    NotAuthenticated: "NotAuthenticated",
    UserNotFound: "UserNotFound",
    InternalServerError: "InternalServerError",
    NetworkError: "NetworkError",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    NotAuthenticated: {
      status: HttpStatusCode.Unauthorized,
      errCode: ErrorCode.NotAuthenticated,
      msg: "Temp: User not authenticated",
    },
    UserNotFound: {
      status: HttpStatusCode.NotFound,
      errCode: ErrorCode.UserNotFound,
      msg: "Temp: User not found",
    },
    InternalServerError: {
      status: HttpStatusCode.InternalServerError,
      errCode: ErrorCode.InternalServerError,
      msg: "Temp: Internal server error",
    },
    NetworkError: {
      status: HttpStatusCode.InternalServerError,
      errCode: ErrorCode.NetworkError,
      msg: "Temp: Network error",
    },
  };

  export type Error = APIErrorResponse<typeof Errors>;
}

// ==============================

type APIFetcherBaseParams = {
  handleAuthFail?: () => void;
  apiStage?: Stage;
};

export class APIFetcherBase {
  protected apiStage: Stage;
  protected apiDomainMap: Record<Stage, string> = {
    [Stage.LOCAL]: "http://localhost:8000",
    [Stage.DEV]: "https://api-dev.bpdev-temp.com",
    [Stage.STAGING]: "https://api-staging.bpdev-temp.com",
    [Stage.PROD]: "https://api.bpdev-temp.com",
  };
  protected get apiDomain() {
    return this.apiDomainMap[this.apiStage] ?? this.apiDomainMap[Stage.PROD];
  }

  protected withCredentials = false;
  protected defaultConfig: AxiosRequestConfig = {
    // withCredentials: this.withCredentials,
  };
  protected handleAuthFail: (() => void) | undefined;

  constructor(params: APIFetcherBaseParams) {
    const { apiStage, handleAuthFail } = params;

    this.handleAuthFail = handleAuthFail;

    this.apiStage = apiStage || Stage.PROD;
  }

  private fetchDefaultHandler<Response extends {}>(
    fetch: () => Promise<AxiosResponse<Response>>
  ): Promise<Response> {
    const reAuth = true;
    return new Promise<Response>(async (resolve, reject) => {
      try {
        const res = await fetch();

        return resolve(res.data);
      } catch (err) {
        const error = err as AxiosError<DefaultErrors.Error>;
        const errCode = error?.response?.data?.errCode;

        if (!errCode) {
          reject(DefaultErrors.Errors.NetworkError);
        } else if (
          errCode === DefaultErrors.ErrorCode.NotAuthenticated &&
          this.handleAuthFail
        ) {
          this.handleAuthFail();
        } else {
          reject(error?.response?.data);
        }
      }
    });
  }

  protected get<Response extends {}>(endpointPath: string) {
    return this.fetchDefaultHandler(() =>
      axios.get<Response>(
        `${this.apiDomain}${endpointPath}`,
        this.defaultConfig
      )
    );
  }

  protected post<Response extends {}, Params extends {} = {}>(
    endpointPath: string,
    params: Params
  ) {
    return this.fetchDefaultHandler(() =>
      axios.post<Response>(
        `${this.apiDomain}${endpointPath}`,
        params,
        this.defaultConfig
      )
    );
  }

  protected put<Response extends {}, Params extends {} = {}>(
    endpointPath: string,
    params: Params
  ) {
    return this.fetchDefaultHandler(() =>
      axios.put<Response>(
        `${this.apiDomain}${endpointPath}`,
        params,
        this.defaultConfig
      )
    );
  }

  protected delete<Response extends {}>(endpointPath: string) {
    return this.fetchDefaultHandler(() =>
      axios.delete<Response>(
        `${this.apiDomain}${endpointPath}`,
        this.defaultConfig
      )
    );
  }
}
