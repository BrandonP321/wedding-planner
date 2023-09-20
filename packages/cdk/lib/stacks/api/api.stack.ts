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
import { handlers } from "../../../configuration/api/handlers";

const subdomainMap = {
  [Stage.DEV]: "api-dev",
  [Stage.STAGING]: "api-staging",
  [Stage.PROD]: "api",
};

export class APICDKStack extends cdk.Stack {
  api;
  handlers;
  deploymentAccount;
  apiUrl;
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

    this.handlers = handlers.map((h) => ({
      ...h,
      function: new NodejsFunction(
        this,
        getUniqueResourceName(
          account,
          `${h.dirName.charAt(0).toUpperCase()}${h.dirName.slice(1)}Function`
        ),
        {
          entry:
            __dirname + `/../../../../api/src/handlers/${h.dirName}/index.ts`,
          handler: "handler",
        }
      ),
    }));

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
          endpointType: apigateway.EndpointType.REGIONAL,
        },
        handler: this.handlers[0].function,
        proxy: false,
      }
    );

    this.integrateHandlersWithGateway();
    this.createHostedZoneRecords();
  }

  integrateHandlersWithGateway = () => {
    this.handlers.forEach((h) => {
      const resource = this.api.root.addResource(h.path);
      const resourceIntegration = new apigateway.LambdaIntegration(h.function);
      resource.addMethod("ANY", resourceIntegration);
    });
  };

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
}
