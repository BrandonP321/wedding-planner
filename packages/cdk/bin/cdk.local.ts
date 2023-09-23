import * as cdk from "aws-cdk-lib";
import {
  APIDeploymentApp,
  APILocalApp,
} from "../configuration/accounts/apiAccounts";
import { APICDKStack } from "../lib/stacks/api/api.stack";
import { getDeploymentStackName } from "../lib/utils/helpers";

const app = new cdk.App();

APILocalApp.deploymentAccounts.forEach((a) => {
  new APICDKStack(app, getDeploymentStackName(a), {
    env: a,
    account: a,
  });
});

app.synth();
