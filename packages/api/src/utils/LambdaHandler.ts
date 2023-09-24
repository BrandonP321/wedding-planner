import querystring from "querystring";

type LambdaHeaders = Record<string, string>;

type LambdaRawEvent = {
  body: string;
  headers: LambdaHeaders;
};

type LambdaEvent<ReqBody> = {
  body: ReqBody;
  headers: LambdaHeaders;
  // queryStringParameters: Record<Q, string>;
};

type LambdaResponse = {
  statusCode: number;
  headers: LambdaHeaders;
  body: string;
};

export class LambdaHandler<ReqBody, ResBody> {
  public statusCode = 200;
  public headers: LambdaHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, Accept",
  };

  public response(body: ResBody): LambdaResponse {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: JSON.stringify(body),
    };
  }

  public addHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  public static handler<ReqBody, ResBody>(
    cb: (
      event: LambdaEvent<ReqBody>,
      handler: LambdaHandler<ReqBody, ResBody>
    ) => Promise<LambdaResponse>
  ) {
    return async (event: LambdaRawEvent) => {
      try {
        console.log(event);
        let body: ReqBody;
        if (
          event.headers["Content-Type"] === "application/x-www-form-urlencoded"
        ) {
          body = querystring.parse(event.body) as ReqBody;
        } else {
          body = JSON.parse(event.body) as ReqBody;
        }
        console.log(body);

        const parsedEvent: LambdaEvent<ReqBody> = {
          body,
          headers: event.headers,
        };

        const handler = new LambdaHandler<ReqBody, ResBody>();

        return await cb(parsedEvent, handler);
      } catch (e) {
        // TODO: Update error handling
        console.error(e);
        return {
          statusCode: 500,
          headers: {},
          body: JSON.stringify({
            message: "Internal server error",
          }),
        };
      }
    };
  }
}
