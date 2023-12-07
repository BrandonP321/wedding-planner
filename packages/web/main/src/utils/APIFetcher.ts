import { UrlUtils } from "@wedding-planner/shared";
import { APIFetcherInternal } from "@wedding-planner/shared/common/api/fetchers";
import { RouteHelper } from "./RouteHelper";

const navigateToLogin = () => {
  const currentPath = UrlUtils.url().path;

  const newUrl = RouteHelper.VendorLogin(undefined, {
    redirectTo: currentPath,
  });

  UrlUtils.replace(newUrl);
};

export const APIFetcher = new APIFetcherInternal({
  apiStage: process.env.REACT_APP_API_STAGE,
  handleAuthFail: navigateToLogin,
});
