import * as cdk from "aws-cdk-lib";
import * as codePipeline from "aws-cdk-lib/aws-codepipeline";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import { Construct } from "constructs";
import { Stage } from "@wedding-planner/shared/common/types/environment";
import { WebMainDeploymentApp } from "../../configuration/accounts/webMainAccounts";
import { WebMainStack } from "./web/main/webMain.stack";
import { getStageResoureName, getUniqueResourceName } from "../utils/helpers";
import { getDistributionArn } from "../utils/cfHelpers";
import { DeploymentAccount } from "../utils/accounts";
import { getWebMainEnvVars } from "./web/main/webMainEnv";
import { PipelineStack } from "./pipeline.stack";

export type WebStacks = { [key in Stage]: WebMainStack };
type BuildOutputs = { [key in Stage]: codePipeline.Artifact };

export const mapValueToStages = <T>(
  getValue: () => T,
  accounts: DeploymentAccount[]
) => {
  const stageMap: { [key in Stage]: T } = {} as { [key in Stage]: T };

  accounts.forEach((account) => {
    stageMap[account.stage] = getValue();
  });

  return stageMap;
};

export class CDKPipelineStack extends PipelineStack {
  webStacks: WebStacks;
  websiteOutputs: BuildOutputs = mapValueToStages(
    () => new codePipeline.Artifact(),
    WebMainDeploymentApp.deploymentAccounts
  );

  constructor(
    scope: Construct,
    id: string,
    webStacks: WebStacks,
    props: cdk.StackProps
  ) {
    super(scope, id, { ...props, pipelineName: "WeddingPlannerPipeline" });

    this.webStacks = webStacks;

    this.addPipelineStages();
  }

  private addPipelineStages(): cdk.aws_codepipeline.IStage[] {
    const sourceStage = this.addSourceStage();
    const buildStage = this.addBuildStage();

    const deployStages = WebMainDeploymentApp.deploymentAccounts.map(
      (account, i) => {
        return this.addDeployStage({
          account,
          includeManualApproval: account.stage === Stage.STAGING,
        });
      }
    );

    return [sourceStage, buildStage, ...deployStages];
  }

  protected getBuildStagePreActions() {
    return [
      this.getReactAppBuildAction(Stage.DEV),
      this.getReactAppBuildAction(Stage.STAGING),
      this.getReactAppBuildAction(Stage.PROD),
    ];
  }

  private getReactAppBuildAction(stage: Stage) {
    const project = new codebuild.PipelineProject(
      this,
      getStageResoureName(stage, "WebsiteBuild"),
      {
        projectName: getStageResoureName(stage, "WebsiteBuild"),
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            install: {
              commands: [
                ". bin/set-artifact-token.sh",
                "cd packages/web/main",
                "yarn install --frozen-lockfile",
              ],
            },
            build: {
              commands: ["yarn run build"],
            },
          },
          artifacts: {
            "base-directory": "packages/web/main/build",
            files: ["**/*"],
          },
        }),
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        },
        environmentVariables: getWebMainEnvVars(stage),
      }
    );

    this.addCodeArtifactPolicyToProject(project);

    return new CodePipelineAction.CodeBuildAction({
      actionName: getStageResoureName(stage, "BuildWebsite"),
      project,
      input: this.sourceOutput,
      outputs: [this.websiteOutputs[stage]],
    });
  }

  private addDeployStage(params: {
    account: DeploymentAccount;
    includeManualApproval?: boolean;
  }) {
    const { account, includeManualApproval = true } = params;

    const stageWebStack = this.webStacks[account.stage];
    const staticAssetsBucket = s3.Bucket.fromBucketName(
      this,
      getUniqueResourceName(account, "ImportedSiteBucket"),
      stageWebStack.websiteBucket.bucketName
    );
    const cfDistributionId = stageWebStack.cfDistribution.distributionId;

    const cfInvalidationProject = new codebuild.PipelineProject(
      this,
      getUniqueResourceName(account, "InvalidateCFCacheProject"),
      {
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            build: {
              commands: [
                'aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"',
              ],
            },
          },
        }),
      }
    );

    cfInvalidationProject.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["*"],
        resources: [getDistributionArn(cfDistributionId, account)],
      })
    );

    const pipelineStage = this.pipeline.addStage({
      stageName: account.stageName,
      actions: [
        this.getStackUpdateAction(account, { runOrder: 1 }),
        new CodePipelineAction.S3DeployAction({
          actionName: getUniqueResourceName(account, "DeployWebsite"),
          input: this.websiteOutputs[account.stage],
          bucket: staticAssetsBucket,
          runOrder: 2,
        }),
        new CodePipelineAction.CodeBuildAction({
          actionName: getUniqueResourceName(account, "InvalidateCFCache"),
          project: cfInvalidationProject,
          environmentVariables: {
            CLOUDFRONT_ID: { value: cfDistributionId },
          },
          // Not sure what should be passed into `input` here since the buildspec doesn't use it
          input: this.websiteOutputs[account.stage],
          runOrder: 3,
        }),
      ],
    });

    if (includeManualApproval) {
      this.addManualApprovalAction(pipelineStage, { runOrder: 4, account });
    }

    return pipelineStage;
  }
}
