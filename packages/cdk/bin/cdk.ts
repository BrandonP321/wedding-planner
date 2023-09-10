#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Cdk2Stack } from "../lib/cdk2-stack";

import { defaultAccountId, defaultRegion } from "../lib/utils/accounts";
import { CDKPipelineStack } from "../lib/stacks/cdkPipeline.stack";
import { WebMainStack } from "../lib/stacks/web/webMain.stack";
import { WebMainDeploymentApp } from "../configuration/accounts/webMainAccounts";
import { getDeploymentStackName } from "../lib/utils/helpers";
import { Stage } from "../lib/utils/types";

const app = new cdk.App();

// TODO: Add stack for each account

const devAccount = WebMainDeploymentApp.deploymentAccounts[0];
const webMainStackDev = new WebMainStack(
  app,
  getDeploymentStackName(devAccount),
  {
    env: devAccount,
    account: devAccount,
  }
);

const WebMainStacks = {
  dev: webMainStackDev,
};

new CDKPipelineStack(app, "WeddingPlannerCDKPipelineStack", WebMainStacks, {
  env: { region: defaultRegion, account: defaultAccountId },
  crossRegionReferences: true,
});

app.synth();
