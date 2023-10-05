import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { getUniqueResourceName } from "../utils/helpers";
import { DeploymentAccount } from "../utils/accounts";
import { addSourceCheckoutPipelineStage } from "../utils/pipelineHelpers";

type PipelineStackProps = cdk.StackProps & {
  pipelineName: string;
};

export class PipelineStack extends cdk.Stack {
  protected pipeline: codepipeline.Pipeline;
  protected props: PipelineStackProps;
  protected sourceOutput = new codepipeline.Artifact();
  protected cdkOutput = new codepipeline.Artifact();

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    this.props = props;

    const artifactBucket = new s3.Bucket(
      this,
      this.getResourceName("ArtifactBuket"),
      {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        versioned: false,
        lifecycleRules: [{ expiration: cdk.Duration.days(7) }],
      }
    );

    this.pipeline = new codepipeline.Pipeline(this, this.props.pipelineName, {
      pipelineName: this.props.pipelineName,
      restartExecutionOnUpdate: true,
      artifactBucket,
    });
  }

  protected getBuildStagePreActions(): codepipeline.IAction[] {
    return [];
  }

  protected addSourceStage() {
    return addSourceCheckoutPipelineStage(this.pipeline, this.sourceOutput, {});
  }

  protected addBuildStage() {
    const project = new codebuild.PipelineProject(
      this,
      this.getResourceName("CDKBuild"),
      {
        projectName: this.getResourceName("CDKBuild"),
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            install: {
              commands: [
                ". bin/set-artifact-token.sh",
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
          privileged: true,
        },
      }
    );

    this.addCodeArtifactPolicyToProject(project);

    return this.pipeline.addStage({
      stageName: "Build",
      actions: [
        ...this.getBuildStagePreActions(),
        new CodePipelineAction.CodeBuildAction({
          actionName: "BuildCDK",
          project,
          input: this.sourceOutput,
          outputs: [this.cdkOutput],
        }),
      ],
    });
  }

  protected addCodeArtifactPolicyToProject(project: codebuild.PipelineProject) {
    project.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["*"],
        resources: ["arn:aws:codeartifact:us-east-1:757269603777:domain/wp"],
      })
    );

    project.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["*"],
        resources: [
          "arn:aws:codeartifact:us-east-1:757269603777:repository/wp/WP-code-artifacts",
        ],
      })
    );

    project.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["sts:GetServiceBearerToken"],
        resources: ["*"],
      })
    );
  }

  protected getStackUpdateAction(
    account: DeploymentAccount,
    params: { runOrder: number }
  ) {
    return new CodePipelineAction.CloudFormationCreateUpdateStackAction({
      actionName: getUniqueResourceName(account, "UpdateDeploymentStack"),
      stackName: account.deploymentStackName,
      templatePath: this.cdkOutput.atPath(
        `${account.deploymentStackName}.template.json`
      ),
      adminPermissions: true,
      runOrder: params.runOrder,
    });
  }

  protected addManualApprovalAction(
    stage: codepipeline.IStage,
    params: { runOrder: number; account: DeploymentAccount }
  ) {
    stage.addAction(
      new CodePipelineAction.ManualApprovalAction({
        actionName: getUniqueResourceName(params.account, "ApproveDeployment"),
        runOrder: params.runOrder,
      })
    );
  }

  protected getResourceName(name: string) {
    return `${this.props.pipelineName}-${name}`;
  }
}
