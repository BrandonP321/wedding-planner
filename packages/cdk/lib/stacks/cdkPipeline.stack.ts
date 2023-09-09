import * as cdk from "aws-cdk-lib";
import * as codePipeline from "aws-cdk-lib/aws-codepipeline";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as s3 from "aws-cdk-lib/aws-s3";
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { Region, Stage } from "../utils/types";
import { WebMainStack } from "./web/webMain.stack";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";

export const defaultRegion = Region.US_WEST_2;
export const defaultAccountId = "757269603777";

export type DeploymentAccountParams = {
  stage: Stage;
  region?: Region;
  account?: string;
};

class DeploymentAccount {
  stage: Stage;
  region: Region;
  account: string;

  constructor({
    stage,
    region = defaultRegion,
    account = defaultAccountId,
  }: DeploymentAccountParams) {
    this.stage = stage;
    this.region = region;
    this.account = account;
  }
}

const accounts: DeploymentAccount[] = [
  new DeploymentAccount({ stage: Stage.DEV }),
  // new DeploymentAccount({ stage: Stage.STAGING }),
  // new DeploymentAccount({ stage: Stage.PROD }),
];

export class CDKPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "Files", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    const outputSources = new codePipeline.Artifact();
    const outputWebsite = new codePipeline.Artifact();

    const pipeline = new codePipeline.Pipeline(this, "Pipeline", {
      pipelineName: "CDKPipeline",
      restartExecutionOnUpdate: true,
      // synth: new ShellStep("Synth", {
      //   input: CodePipelineSource.gitHub("BrandonP321/wedding-planner", "main"),
      //   commands: [
      //     "cd packages/cdk",
      //     "yarn install --frozen-lockfile",
      //     "yarn build",
      //     "yarn cdk synth",
      //   ],
      //   primaryOutputDirectory: "packages/cdk/cdk.out",
      // }),
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: "Checkout",
          owner: "BrandonP321",
          repo: "wedding-planner",
          oauthToken: cdk.SecretValue.secretsManager("github-token"),
          output: outputSources,
          trigger: CodePipelineAction.GitHubTrigger.WEBHOOK,
          branch: "main",
        }),
      ],
    });

    pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "Website",
          project: new codebuild.PipelineProject(this, "WebsiteBuild", {
            projectName: "WebsiteBuild",
            buildSpec: codebuild.BuildSpec.fromObjectToYaml({
              version: "1.0",
              phases: {
                preBuild: {
                  commands: ["cd packages/web/main", "yarn install"],
                },
                build: {
                  commands: ["yarn run build"],
                },
              },
              // artifacts: {
              //   base-directory: "packages/web/main/build",
              // },
            }),
          }),
          input: outputSources,
          outputs: [outputWebsite],
        }),
      ],
    });

    accounts.forEach((account) => {
      pipeline.addStage({
        stageName: "Deploy",
        actions: [
          new CodePipelineAction.S3DeployAction({
            actionName: "Website",
            input: outputWebsite,
            bucket: websiteBucket,
          }),
        ],
      });

      // const pipelineStage = pipeline.addStage(
      //   new CDKPipelineStage(this, account.stage, {
      //     ...props,
      //     env: { ...account },
      //     ...account,
      //   })
      // );

      // pipelineStage.addPost(new ManualApprovalStep("approval"));
    });
  }
}

export class CDKPipelineStage extends cdk.Stage {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StageProps & Required<DeploymentAccountParams>
  ) {
    super(scope, id, props);

    const webMainStack = new WebMainStack(this, "WebMainStack", props);
  }
}
