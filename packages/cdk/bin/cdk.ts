#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { defaultAccountId, defaultRegion } from "../lib/utils/accounts";
import { CDKPipelineStack, WebStacks } from "../lib/stacks/cdkPipeline.stack";
import { WebMainStack } from "../lib/stacks/web/webMain.stack";
import { WebMainDeploymentApp } from "../configuration/accounts/webMainAccounts";
import { getDeploymentStackName } from "../lib/utils/helpers";

const app = new cdk.App();

const WebMainStacks: WebStacks = {} as WebStacks;

WebMainDeploymentApp.deploymentAccounts.forEach((account) => {
  WebMainStacks[account.stage] = new WebMainStack(
    app,
    getDeploymentStackName(account),
    {
      env: account,
      account: account,
    }
  );
});

new CDKPipelineStack(app, "WeddingPlannerCDKPipelineStack", WebMainStacks, {
  env: { region: defaultRegion, account: defaultAccountId },
  crossRegionReferences: true,
});

app.synth();
