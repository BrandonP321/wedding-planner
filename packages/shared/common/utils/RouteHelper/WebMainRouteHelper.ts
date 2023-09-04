import { RouteHelperInternal, RouteParams } from "./RouteHelperInternal";

export class WebMainRouteHelper extends RouteHelperInternal {
  public static Home = () => `/`;

  public static UserProfileParams: "userId";
  public static UserProfile =
    this.CreateRoute<typeof this.UserProfileParams>("/user/:userId");
}
