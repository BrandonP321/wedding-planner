import * as cdk from "aws-cdk-lib";
import * as codePipeline from "aws-cdk-lib/aws-codepipeline";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { Stage } from "../utils/types";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import { addSourceCheckoutPipelineStage } from "../utils/pipelineHelpers";
import { WebMainDeploymentApp } from "../../configuration/accounts/webMainAccounts";
import { DeploymentAccount } from "../utils/accounts";
import { WebMainStack } from "./web/webMain.stack";
import { getUniqueResourceName } from "../utils/helpers";
import { getDistributionArn } from "../utils/cfHelpers";

type WebStacks = { [key in Stage]: WebMainStack };

export class CDKPipelineStack extends cdk.Stack {
  props: cdk.StackProps;
  webStacks: WebStacks;
  pipeline: cdk.aws_codepipeline.Pipeline;
  outputSources = new codePipeline.Artifact();
  websiteOutput = new codePipeline.Artifact();
  cdkOutput = new codePipeline.Artifact();

  constructor(
    scope: Construct,
    id: string,
    webStacks: WebStacks,
    props: cdk.StackProps
  ) {
    super(scope, id, props);

    this.props = props;
    this.webStacks = webStacks;

    this.pipeline = new codePipeline.Pipeline(this, "WeddingPlannerPipeline", {
      pipelineName: "WeddingPlanner-CDKPipeline",
      restartExecutionOnUpdate: true,
    });

    this.addPipelineStages();
  }

  private addPipelineStages(): cdk.aws_codepipeline.IStage[] {
    const sourceStage = this.addSourceStage();
    const buildStage = this.addBuildStage();
    const devStage = this.addDeployStage({ name: "Dev", stage: Stage.DEV });

    return [sourceStage, buildStage, devStage];
  }

  private addSourceStage() {
    return addSourceCheckoutPipelineStage(
      this.pipeline,
      this.outputSources,
      {}
    );
  }

  private addBuildStage() {
    return this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "BuildWebsite",
          project: new codebuild.PipelineProject(this, "WebsiteBuild", {
            projectName: "WebsiteBuild",
            buildSpec: codebuild.BuildSpec.fromObject({
              version: "0.2",
              phases: {
                install: {
                  commands: [
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
          }),
          input: this.outputSources,
          outputs: [this.websiteOutput],
        }),
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
          input: this.outputSources,
          outputs: [this.cdkOutput],
        }),
      ],
    });
  }

  private addDeployStage(params: { stage: Stage; name: string }) {
    const { name, stage } = params;

    const devAccount = WebMainDeploymentApp.deploymentAccounts[0];

    const stageWebStack = this.webStacks[stage];
    const staticAssetsBucket = s3.Bucket.fromBucketName(
      this,
      getUniqueResourceName(devAccount, "ImportedSiteBucket"),
      stageWebStack.websiteBucket.bucketName
    );
    const cfDistributionId = stageWebStack.cfDistribution.distributionId;

    const cfInvalidationProject = new codebuild.PipelineProject(
      this,
      "InvalidateCFCache",
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
        actions: ["cloudfront:CreateInvalidation"],
        resources: [getDistributionArn(cfDistributionId, devAccount)],
      })
    );

    const pipelineStage = this.pipeline.addStage({
      stageName: name,
      actions: [
        new CodePipelineAction.CloudFormationCreateUpdateStackAction({
          actionName: `UpdateDeploymentStack-${stage}`,
          stackName: devAccount.deploymentStackName,
          templatePath: this.cdkOutput.atPath(
            `${devAccount.deploymentStackName}.template.json`
          ),
          adminPermissions: true,
          runOrder: 2,
        }),
        new CodePipelineAction.S3DeployAction({
          actionName: getUniqueResourceName(devAccount, "DeployWebsite"),
          input: this.websiteOutput,
          bucket: staticAssetsBucket,
          runOrder: 1,
        }),
        new CodePipelineAction.CodeBuildAction({
          actionName: getUniqueResourceName(devAccount, "InvalidateCFCache"),
          project: cfInvalidationProject,
          environmentVariables: {
            CLOUDFRONT_ID: { value: cfDistributionId },
          },
          // Not sure what should be passed into `input` here since the buildspec doesn't use it
          input: this.websiteOutput,
          runOrder: 3,
        }),
      ],
    });

    return pipelineStage;
  }
}
