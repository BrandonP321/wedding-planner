import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { Construct } from "constructs";
import { DeploymentAccountParams } from "../cdkPipeline.stack";

export class WebMainStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps & DeploymentAccountParams
  ) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, "AmplifyApp", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "BrandonP321",
        repository: "wedding-planner",
        oauthToken: cdk.SecretValue.secretsManager("github-token"),
      }),
      autoBranchCreation: {
        pullRequestPreview: true,
        patterns: ["feature/*", "bug/*"],
      },
      autoBranchDeletion: true,
      appName: "some-app-name",
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: 1,
        applications: [
          {
            frontend: {
              phases: {
                preBuild: {
                  commands: ["yarn install"],
                },
                build: {
                  commands: ["yarn run build"],
                },
              },
              artifacts: {
                baseDirectory: "build",
                files: ["**/*"],
              },
            },
            appRoot: "packages/web/main",
          },
        ],
      }),
    });

    const mainBranch = amplifyApp.addBranch("main");

    amplifyApp.addCustomRule(
      amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
    );
  }
}
