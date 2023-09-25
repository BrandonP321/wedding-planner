import { RouteHelperInternal } from "./RouteHelperInternal";

export namespace WebMainRouteHelper {
  export namespace VendorSearch {
    export type SearchParams = "city";
  }

  export namespace UserProfile {
    export type UrlParams = "userId";
  }
}

export class WebMainRouteHelper extends RouteHelperInternal {
  public Home = this.CreateRoute(`/`);

  public VendorLogin = this.CreateRoute(`/vendor/login`);
  public VendorSignup = this.CreateRoute(`/vendor/signup`);
  public VendorVerifyEmail = this.CreateRoute(`/vendor/verify-email`);

  public VendorSearch = this.CreateRoute<
    undefined,
    WebMainRouteHelper.VendorSearch.SearchParams
  >(`/vendor/search`);

  public VendorForgotPassword = this.CreateRoute(`/vendor/forgot-password`);
  public VendorResetPassword = this.CreateRoute(`/vendor/reset-password`);

  public VendorPricing = this.CreateRoute(`/vendor/pricing`);

  public UserProfile =
    this.CreateRoute<WebMainRouteHelper.UserProfile.UrlParams>("/user/:userId");
}

export default WebMainRouteHelper;
