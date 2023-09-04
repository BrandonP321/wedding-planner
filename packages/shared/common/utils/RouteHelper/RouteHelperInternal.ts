export type RouteParams<T extends string> = { [key in T]: string };

export class RouteHelperInternal {
  protected static CreateRoute = <Params extends string>(path: string) => {
    return (params?: RouteParams<Params>) => {
      let route = path;
      for (const key in params) {
        route = route.replace(`:${key}`, params[key]);
      }
      return route;
    };
  };
}
