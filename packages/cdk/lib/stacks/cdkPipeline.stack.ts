import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { Region, Stage } from "../utils/types";
import { WebMainStack } from "./web/webMain.stack";

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
  new DeploymentAccount({ stage: Stage.STAGING }),
  new DeploymentAccount({ stage: Stage.PROD }),
];

export class CDKPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "CDKPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("BrandonP321/wedding-planner", "main"),
        commands: [
          "cd packages/cdk",
          "yarn install --frozen-lockfile",
          "yarn build",
          "yarn cdk synth",
        ],
        primaryOutputDirectory: "packages/cdk/cdk.out",
      }),
    });

    accounts.forEach((account) => {
      const stage = pipeline.addStage(
        new CDKPipelineStage(this, "", {
          ...props,
          env: { ...account },
          ...account,
        })
      );

      stage.addPost(new ManualApprovalStep("approval"));
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
