import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpStatusCode } from "../../api/requests";
import { Stage } from "../types/environment";
import { DefaultAPIError } from "../../api/requests/requestErrors";

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

  protected defaultConfig: AxiosRequestConfig = {
    withCredentials: true,
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
        const error = err as AxiosError<DefaultAPIError.ErrorResponse>;
        const errCode = error?.response?.data?.code;

        if (!errCode) {
          reject(DefaultAPIError.Errors.NetworkError);
        } else if (
          errCode === DefaultAPIError.Codes.NotAuthenticated &&
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
