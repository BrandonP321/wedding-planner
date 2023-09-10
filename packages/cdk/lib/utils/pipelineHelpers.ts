import * as cdk from "aws-cdk-lib";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";

type SourceStageProps =
  Partial<cdk.aws_codepipeline_actions.GitHubSourceActionProps> & {};

export const addSourceCheckoutPipelineStage = (
  pipeline: cdk.aws_codepipeline.Pipeline,
  outputSources: cdk.aws_codepipeline.Artifact,
  props: SourceStageProps
) =>
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
        ...props,
      }),
    ],
  });
