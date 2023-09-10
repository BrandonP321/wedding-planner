#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Cdk2Stack } from "../lib/cdk2-stack";

import { defaultAccountId, defaultRegion } from "../lib/utils/accounts";
import { CDKPipelineStack } from "../lib/stacks/cdkPipeline.stack";
import { WebMainStack } from "../lib/stacks/web/webMain.stack";
import { WebMainDeploymentApp } from "../configuration/accounts/webMainAccounts";
import { getDeploymentStackName } from "../lib/utils/helpers";

const app = new cdk.App();

new CDKPipelineStack(app, "WeddingPlannerCDKPipelineStack", {
  env: { region: defaultRegion, account: defaultAccountId },
  crossRegionReferences: true,
});

// TODO: Add stack for each account

const devAccount = WebMainDeploymentApp.deploymentAccounts[0];
new WebMainStack(app, getDeploymentStackName(devAccount), {
  env: devAccount,
  account: devAccount,
});

app.synth();
