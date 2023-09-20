#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { defaultAccountId, defaultRegion } from "../lib/utils/accounts";
import { CDKPipelineStack, WebStacks } from "../lib/stacks/cdkPipeline.stack";
import { WebMainStack } from "../lib/stacks/web/main/webMain.stack";
import { WebMainDeploymentApp } from "../configuration/accounts/webMainAccounts";
import { getDeploymentStackName } from "../lib/utils/helpers";
import { APICDKStack } from "../lib/stacks/api/api.stack";
import {
  APIPipelineStack,
  APIStacks,
} from "../lib/stacks/api/apiPipeline.stack";
import { APIDeploymentApp } from "../configuration/accounts/apiAccounts";

const app = new cdk.App();

// Web Main

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

// API

const APIStacks = {} as APIStacks;

APIDeploymentApp.deploymentAccounts.forEach((a) => {
  APIStacks[a.stage] = new APICDKStack(app, getDeploymentStackName(a), {
    env: a,
    account: a,
  });
});

new APIPipelineStack(app, "WeddingPlanner-API-Pipeline", APIStacks, {
  env: { region: defaultRegion, account: defaultAccountId },
  crossRegionReferences: true,
});

app.synth();
