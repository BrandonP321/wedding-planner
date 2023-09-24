import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import { Construct } from "constructs";
import { APICDKStack } from "./api.stack";
import { DeploymentAccount } from "../../utils/accounts";
import { APIDeploymentApp } from "../../../configuration/accounts/apiAccounts";
import { PipelineStack } from "../pipeline.stack";

export class APIPipelineStack extends PipelineStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, pipelineName: "WeddingPlanner-API-Pipeline" });

    this.addPipelineStages();
  }

  private addPipelineStages(): codepipeline.IStage[] {
    const sourceStage = this.addSourceStage();
    const buildStage = this.addBuildStage();

    const deployStages = APIDeploymentApp.deploymentAccounts.map((account) => {
      return this.addDeployStage({
        account,
        includeManualApproval: account.isProdStage,
      });
    });

    return [sourceStage, buildStage, ...deployStages];
  }

  private addDeployStage(params: {
    account: DeploymentAccount;
    includeManualApproval: boolean;
  }) {
    const { account, includeManualApproval = true } = params;

    const pipelineStage = this.pipeline.addStage({
      stageName: account.stage,
      actions: [this.getStackUpdateAction(account, { runOrder: 1 })],
    });

    if (includeManualApproval) {
      this.addManualApprovalAction(pipelineStage, { runOrder: 2, account });
    }

    return pipelineStage;
  }
}
