import { UrlUtils } from "../UrlUtils";

export type RouteParams<T extends string | undefined> = T extends string
  ? Record<T, string>
  : undefined;

export class RouteHelperInternal {
  protected domain: string = "";

  constructor(domain?: string) {
    if (domain) {
      this.domain = domain.endsWith("/") ? domain : `${domain}/`;
    }
  }

  protected CreateRoute = <
    URLParams extends string | undefined,
    SearchParams extends string = ""
  >(
    path: string
  ) => {
    return (
      urlParams?: RouteParams<URLParams>,
      searchParams?: Partial<RouteParams<SearchParams>>
    ) => {
      let route = path;

      if (urlParams) {
        for (const key in urlParams) {
          route = route.replace(`:${key}`, urlParams[key]);
        }
      }

      // Temporary domain for URL generation if no domain is set
      const tempDomain = "https://temp-domain.com";

      const url = UrlUtils.url(`${this.domain || tempDomain}${route}`)
        .addParams(searchParams ?? {})
        .href.replace(tempDomain, "");

      return url;
    };
  };
}
