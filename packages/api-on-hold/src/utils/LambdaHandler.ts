import querystring from "querystring";
import { Sequelize } from "sequelize";
import { createAssociations } from "../models/associations";
import { tempChoiceInit } from "../models/choice/choice.model";
import { tempChoiceGroupInit } from "../models/choiceGroup/choiceGroup.model";
import { tempMainChoiceInit } from "../models/mainChoice/mainChoice.model";
import { tempMainChoiceAttributeInit } from "../models/mainChoiceAttribute/mainChoiceAttribute.model";
import { tempVendorInit } from "../models/vendor/vendor.model";

// ==============================

// const sequelize = new Sequelize("postgres", "tempadmin", "Scooby3278", {
//   host: "wp-temp-db.cluster-cveiephms8k5.us-east-1.rds.amazonaws.com",
//   dialect: "postgres",
//   logging: false,
// });

// tempChoiceGroupInit(sequelize);
// tempChoiceInit(sequelize);
// tempMainChoiceInit(sequelize);
// tempVendorInit(sequelize);
// tempMainChoiceAttributeInit(sequelize);

// createAssociations();

// const start = Date.now();
// sequelize.sync().then(async () => {
//   const secondsElapsed = (Date.now() - start) / 1000;
//   console.log(`synced in ${secondsElapsed} seconds`);
// });

// ==============================

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
