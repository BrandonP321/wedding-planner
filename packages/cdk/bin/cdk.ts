#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { defaultAccountId, defaultRegion } from "../lib/utils/accounts";
import { CDKPipelineStack, WebStacks } from "../lib/stacks/cdkPipeline.stack";
import { WebMainStack } from "../lib/stacks/web/main/webMain.stack";
import { WebMainDeploymentApp } from "../configuration/accounts/webMainAccounts";
import { getDeploymentStackName } from "../lib/utils/helpers";
import { APICDKStack } from "../lib/stacks/api/api.stack";
import { APIPipelineStack } from "../lib/stacks/api/apiPipeline.stack";
import { APIDeploymentApp } from "../configuration/accounts/apiAccounts";
import {
  addAPIPipelineTags,
  addAPITags,
  addDefaultTags,
  addStageTags,
  addWebMainPipelineTags,
  addWebMainTags,
} from "../lib/utils/tagHelpers";

const app = new cdk.App();

addDefaultTags(app);

// Web Main

const WebMainStacks: WebStacks = {} as WebStacks;

WebMainDeploymentApp.deploymentAccounts.forEach((account) => {
  const stack = new WebMainStack(app, getDeploymentStackName(account), {
    env: account,
    account: account,
  });

  addWebMainTags(stack);
  addStageTags(stack, account.stage);

  WebMainStacks[account.stage] = stack;
});

const webMainPipelineStack = new CDKPipelineStack(
  app,
  "WeddingPlannerCDKPipelineStack",
  WebMainStacks,
  {
    env: { region: defaultRegion, account: defaultAccountId },
    crossRegionReferences: true,
  }
);

addWebMainPipelineTags(webMainPipelineStack);

// API

APIDeploymentApp.deploymentAccounts.forEach((a) => {
  const stack = new APICDKStack(app, getDeploymentStackName(a), {
    env: a,
    account: a,
  });

  addAPITags(stack);
});

const apiPipelineStack = new APIPipelineStack(
  app,
  "WeddingPlanner-API-Pipeline",
  {
    env: { region: defaultRegion, account: defaultAccountId },
    crossRegionReferences: true,
  }
);

addAPIPipelineTags(apiPipelineStack);

app.synth();
