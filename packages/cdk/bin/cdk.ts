#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Cdk2Stack } from "../lib/cdk2-stack";
import { WebMainStack } from "../lib/stacks/web/webMain.stack";
import { Region, Stage } from "../lib/utils/types";
import { RegionInfo } from "aws-cdk-lib/region-info";
import { CDKPipelineStack } from "../lib/stacks/cdkPipeline.stack";

const app = new cdk.App();
// new Cdk2Stack(app, "Cdk2Stack", {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */
//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },
//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

const defaultRegion = Region.US_WEST_2;
const defaultAccountId = "757269603777";

type DeploymentAccountParams = {
  stage: Stage;
  region?: Region;
  accountID?: string;
};

class DeploymentAccount {
  stage: string;
  region: string;
  accountID: string;

  constructor({
    stage,
    region = defaultRegion,
    accountID = defaultAccountId,
  }: DeploymentAccountParams) {
    this.stage = stage;
    this.region = region;
    this.accountID = accountID;
  }
}

const accounts: DeploymentAccount[] = [
  new DeploymentAccount({ stage: Stage.PROD }),
  new DeploymentAccount({ stage: Stage.STAGING }),
  new DeploymentAccount({ stage: Stage.DEV }),
];

new CDKPipelineStack(app, "CDKPipelineStack", {
  env: { account: defaultAccountId, region: defaultRegion },
});

// accounts.forEach(({ accountID, region, stage }) => {
//   new WebMainStack(app, "WebMainStack", {
//     env: { account },
//   });
// });

app.synth();
