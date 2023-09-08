import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

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
      }),
    });
  }
}
