import { RouteHelperInternal } from "./RouteHelperInternal";

export class WebMainRouteHelper extends RouteHelperInternal {
  public static Home = this.CreateRoute(`/`);

  public static VendorLogin = this.CreateRoute(`/vendor/login`);
  public static VendorSignup = this.CreateRoute(`/vendor/signup`);
  public static VendorVerifyEmail = () =>
    this.CreateRoute(`/vendor/verify-email`);

  public static VendorForgotPassword = () =>
    this.CreateRoute(`/vendor/forgot-password`);
  public static VendorResetPassword = () =>
    this.CreateRoute(`/vendor/reset-password`);

  public static VendorPricing = this.CreateRoute(`/vendor/pricing`);

  public static UserProfileParams: "userId";
  public static UserProfile =
    this.CreateRoute<typeof this.UserProfileParams>("/user/:userId");
}
