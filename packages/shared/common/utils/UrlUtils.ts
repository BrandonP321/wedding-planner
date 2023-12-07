type URLParams = Record<string, string | undefined>;

class Url {
  private url: URL;

  public get hash() {
    return this.url.hash;
  }
  public get params() {
    return this.url.searchParams;
  }
  public get path() {
    return this.url.pathname;
  }
  public get origin() {
    return this.url.origin;
  }
  public get href() {
    return this.url.href;
  }

  constructor(url: string) {
    this.url = new URL(url);
  }

  public setPath = (path: string) => {
    this.url.pathname = path;

    return this;
  };

  public addParams = (params: URLParams) => {
    for (const key in params) {
      const value = params[key];

      value && this.url.searchParams.append(key, value);
    }

    return this;
  };

  public getParam = (key: string) => {
    return this.url.searchParams.get(key);
  };
}

export class UrlUtils {
  public static url = (url = window.location.href) => {
    return new Url(url);
  };

  public static getParam = (key: string, url?: string) => {
    return UrlUtils.url(url).getParam(key);
  };

  public static navigateTo = (url: string) => {
    window.location.href = url;
  };

  public static replace = (url: string) => {
    window.location.replace(url);
  };
}
