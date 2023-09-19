import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import fs from "fs";
import { handlers } from "@wedding-planner/api/src/handlers";

export class APICDKStack extends cdk.Stack {
  api;
  handlers = handlers.map((h) => ({
    ...h,
    function: new NodejsFunction(
      this,
      `${h.dirName.charAt(0).toUpperCase()}${h.dirName.slice(1)}Function`,
      {
        entry:
          __dirname + `/../../../../api/src/handlers/${h.dirName}/index.ts`,
        handler: "handler",
      }
    ),
  }));

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = new apigateway.LambdaRestApi(this, "api", {
      restApiName: "WeddingPlanner API",
      deploy: true,
      deployOptions: {
        stageName: "dev",
      },
      handler: this.handlers[0].function,
      proxy: false,
    });

    this.integrateHandlersWithGateway();
  }

  integrateHandlersWithGateway = () => {
    this.handlers.forEach((h) => {
      const resource = this.api.root.addResource(h.path);
      const resourceIntegration = new apigateway.LambdaIntegration(h.function);
      resource.addMethod("ANY", resourceIntegration);
    });
  };
}
