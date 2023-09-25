export type RouteParams<T extends string> = { [key in T]: string };

export class RouteHelperInternal {
  protected domain: string = "";

  constructor(domain?: string) {
    if (domain) {
      this.domain = domain.endsWith("/") ? domain : `${domain}/`;
    }
  }

  protected CreateRoute = <Params extends string>(path: string) => {
    return (params?: RouteParams<Params>) => {
      let route = path;
      for (const key in params) {
        route = route.replace(`:${key}`, params[key]);
      }
      return `${this.domain}${route}`;
    };
  };
}
