import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import { Stage } from "../../utils/types";
import { APICDKStack } from "./api.stack";
import { addSourceCheckoutPipelineStage } from "../../utils/pipelineHelpers";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import { DeploymentAccount } from "../../utils/accounts";
import { getUniqueResourceName } from "../../utils/helpers";
import { APIDeploymentApp } from "../../../configuration/accounts/apiAccounts";

export type APIStacks = Record<Stage, APICDKStack>;

export class APIPipelineStack extends cdk.Stack {
  props;
  pipeline;
  apiStacks;
  sourceOutput = new codepipeline.Artifact();
  cdkOutput = new codepipeline.Artifact();

  constructor(
    scope: Construct,
    id: string,
    apiStacks: APIStacks,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    this.apiStacks = apiStacks;
    this.props = props;

    const artifactBucket = new s3.Bucket(this, "APIPipelineArtifacts", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      lifecycleRules: [{ expiration: cdk.Duration.days(7) }],
    });

    this.pipeline = new codepipeline.Pipeline(
      this,
      "WeddingPlanner-API-Pipeline",
      {
        pipelineName: "WeddingPlanner-API-Pipeline",
        restartExecutionOnUpdate: true,
        artifactBucket,
      }
    );

    this.addPipelineStages();
  }

  private addPipelineStages(): codepipeline.IStage[] {
    const sourceStage = this.addSourceStage();
    const buildStage = this.addBuildStage();

    const deployStages = APIDeploymentApp.deploymentAccounts.map((account) => {
      return this.addDeployStage({
        account,
        includeManualApproval: account.stage !== Stage.PROD,
      });
    });

    return [sourceStage, buildStage, ...deployStages];
  }

  private addSourceStage() {
    return addSourceCheckoutPipelineStage(this.pipeline, this.sourceOutput, {});
  }

  private addBuildStage() {
    return this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "BuildCDK",
          project: new codebuild.PipelineProject(this, "CDKBuild", {
            projectName: "CDKBuild",
            buildSpec: codebuild.BuildSpec.fromObject({
              version: "0.2",
              phases: {
                install: {
                  commands: [
                    "cd packages/cdk",
                    "yarn install --frozen-lockfile",
                  ],
                },
                build: {
                  commands: ["yarn cdk synth"],
                },
              },
              artifacts: {
                "base-directory": "packages/cdk/cdk.out",
                files: ["**/*"],
              },
            }),
            environment: {
              buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
            },
          }),
          input: this.sourceOutput,
          outputs: [this.cdkOutput],
        }),
      ],
    });
  }

  private addDeployStage(params: {
    account: DeploymentAccount;
    includeManualApproval: boolean;
  }) {
    const { account, includeManualApproval = true } = params;

    const apiStack = this.apiStacks[account.stage];

    const pipelineStage = this.pipeline.addStage({
      stageName: account.stage,
      actions: [
        // First update the stack so all resources are provisioned appropriately
        new CodePipelineAction.CloudFormationCreateUpdateStackAction({
          actionName: getUniqueResourceName(account, "UpdateDeploymentStack"),
          stackName: account.deploymentStackName,
          templatePath: this.cdkOutput.atPath(
            `${account.deploymentStackName}.template.json`
          ),
          adminPermissions: true,
          runOrder: 1,
        }),
      ],
    });

    if (includeManualApproval) {
      pipelineStage.addAction(
        this.createManualApprovalAction(account, { runOrder: 2 })
      );
    }

    return pipelineStage;
  }

  private createManualApprovalAction(
    account: DeploymentAccount,
    params: { runOrder?: number }
  ) {
    return new CodePipelineAction.ManualApprovalAction({
      actionName: getUniqueResourceName(account, "ApproveDeployment"),
      runOrder: params.runOrder,
    });
  }
}
