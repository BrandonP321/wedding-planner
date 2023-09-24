import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { DeploymentAccount } from "../../utils/accounts";
import { getUniqueResourceName } from "../../utils/helpers";
import { WEB_APP_DOMAIN } from "../../utils/constants";
import { Stage } from "../../utils/types";
import {
  APIGatewayResource,
  APIHandlers,
} from "@wedding-planner/shared/api/handlers";

const subdomainMap = {
  [Stage.DEV]: "api-dev",
  [Stage.STAGING]: "api-staging",
  [Stage.PROD]: "api",
  [Stage.LOCAL]: "api-local",
};

export class APICDKStack extends cdk.Stack {
  api: apigateway.LambdaRestApi;
  deploymentAccount: DeploymentAccount;
  apiUrl: string;
  hostedZone: route53.IHostedZone;

  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps & {
      account: DeploymentAccount;
    }
  ) {
    super(scope, id, props);
    const { account } = props;

    this.deploymentAccount = account;

    const subDomain = subdomainMap[account.stage];
    this.apiUrl = `${subDomain}.${WEB_APP_DOMAIN}`;

    const defaultHandler = this.createLambdaFunction("default");

    this.getHostedZone();

    this.api = new apigateway.LambdaRestApi(
      this,
      getUniqueResourceName(account, "APIGateway"),
      {
        restApiName: getUniqueResourceName(account, "APIGateway"),
        deploy: true,
        deployOptions: {},
        domainName: {
          domainName: this.apiUrl,
          certificate: this.getACMCertificate(),
          endpointType: apigateway.EndpointType.EDGE,
        },
        handler: defaultHandler,
        proxy: false,
      }
    );

    Object.entries(APIHandlers).forEach((entry) => {
      const pathPart = entry[0];
      const resource = entry[1] as APIGatewayResource;

      this.createAPIGatewayResources(
        pathPart,
        this.api.root,
        resource.nestedHandlers,
        resource.handlerDirName
      );
    });

    this.createHostedZoneRecords();
  }

  private getHostedZone() {
    this.hostedZone = route53.HostedZone.fromLookup(
      this,
      getUniqueResourceName(this.deploymentAccount, "HostedZone"),
      {
        domainName: WEB_APP_DOMAIN,
      }
    );
  }

  private createHostedZoneRecords() {
    new route53.ARecord(
      this,
      getUniqueResourceName(this.deploymentAccount, "AliasRecord"),
      {
        zone: this.hostedZone,
        recordName: this.apiUrl,
        target: route53.RecordTarget.fromAlias(
          new targets.ApiGateway(this.api)
        ),
      }
    );
  }

  private getACMCertificate() {
    return new acm.Certificate(
      this,
      getUniqueResourceName(this.deploymentAccount, "SiteCertificate"),
      {
        domainName: this.apiUrl,
        validation: acm.CertificateValidation.fromDns(this.hostedZone),
      }
    );
  }

  private createLambdaFunction = (dirName: string) =>
    new NodejsFunction(
      this,
      getUniqueResourceName(
        this.deploymentAccount,
        `${dirName.charAt(0).toUpperCase()}${dirName.slice(1)}Function`
      ),
      {
        entry: __dirname + `/../../../../api/src/handlers/${dirName}/index.ts`,
        handler: "lambdaHandler",
        bundling: {
          assetHash: `WP-Lambda-Fuction-${dirName}`,
          environment: {},
        },
      }
    );

  private createAPIGatewayResource = (
    pathPart: string,
    parentResource: apigateway.IResource,
    func?: lambda.IFunction
  ) => {
    const apiGatewayResource = parentResource.addResource(pathPart);

    if (func) {
      const resourceIntegration = new apigateway.LambdaIntegration(func);
      apiGatewayResource.addMethod("ANY", resourceIntegration);
    }

    return apiGatewayResource;
  };

  private createAPIGatewayResources = (
    pathPart: string,
    parentResource: apigateway.IResource,
    nestedHandlers: Record<string, APIGatewayResource> | undefined,
    dirName: string | undefined
  ): void => {
    const hasHandler = !!dirName;

    const lambdaHandler = !hasHandler
      ? undefined
      : this.createLambdaFunction(dirName);

    const apiGatewayResource = this.createAPIGatewayResource(
      pathPart,
      parentResource,
      lambdaHandler
    );

    if (nestedHandlers) {
      return Object.entries(nestedHandlers).forEach(
        ([nestedPathPart, nestedResource]) =>
          this.createAPIGatewayResources(
            nestedPathPart,
            apiGatewayResource,
            nestedResource.nestedHandlers,
            nestedResource.handlerDirName
          )
      );
    } else {
      return;
    }
  };
}
