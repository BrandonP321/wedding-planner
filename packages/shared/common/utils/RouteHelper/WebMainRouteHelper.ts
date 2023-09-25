import { RouteHelperInternal } from "./RouteHelperInternal";

export class WebMainRouteHelper extends RouteHelperInternal {
  public Home = this.CreateRoute(`/`);

  public VendorLogin = this.CreateRoute(`/vendor/login`);
  public VendorSignup = this.CreateRoute(`/vendor/signup`);
  public VendorVerifyEmail = this.CreateRoute(`/vendor/verify-email`);

  public VendorForgotPassword = this.CreateRoute(`/vendor/forgot-password`);
  public VendorResetPassword = this.CreateRoute(`/vendor/reset-password`);

  public VendorPricing = this.CreateRoute(`/vendor/pricing`);

  public UserProfileParams: "userId" = "userId";
  public UserProfile =
    this.CreateRoute<typeof this.UserProfileParams>("/user/:userId");
}
