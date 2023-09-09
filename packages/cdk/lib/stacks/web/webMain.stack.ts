import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as codePipeline from "aws-cdk-lib/aws-codepipeline";
import { Construct } from "constructs";
import { DeploymentAccountParams } from "../cdkPipeline.stack";

export class WebMainStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps & DeploymentAccountParams
  ) {
    const { region } = props;
    super(scope, id, props);

    const WEB_APP_DOMAIN = "bpdev-temp.com";

    // hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: WEB_APP_DOMAIN,
    });

    console.log(hostedZone.zoneName);

    // site s3 bucket
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: WEB_APP_DOMAIN,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // site certificate
    const siteCertificate = new acm.DnsValidatedCertificate(
      this,
      "SiteCertificate",
      {
        domainName: WEB_APP_DOMAIN,
        hostedZone,
        region,
      }
    ).certificateArn;

    // CF distribution
    const siteDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "SiteDistribution",
      {
        // viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate({
        //   certificateArn: siteCertificate,
        //   applyRemovalPolicy: ,
        //   // applyRemovalPolicy: cdk.RemovalPolicy.DESTROY,
        // }),
        originConfigs: [
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
      }
    );

    // A Record custom domain to CF CDN
    new route53.ARecord(this, "SiteAliasRecord", {
      recordName: WEB_APP_DOMAIN,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(siteDistribution)
      ),
      zone: hostedZone,
    });

    // Build react app
    // const repo = Repository.fromRepositoryName(
    //   this,
    //   "MyRepo",
    //   "repository-name"
    // );

    const buildProject = new codebuild.PipelineProject(this, "MyBuildProject", {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: ["npm install"],
          },
          build: {
            commands: ["npm run build"],
          },
        },
        artifacts: {
          "base-directory": "build",
          files: ["**/*"],
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
    });

    // Deploy site contents to S3 bucket
    // new deploy.BucketDeployment(this, "Deployment", {
    //   sources: [deploy.Source.asset("../web/main/build")],
    //   destinationBucket: siteBucket,
    //   distribution: siteDistribution,
    //   distributionPaths: ["/*"],
    // });
  }
}

// const amplifyApp = new Amplify(this, "AmplifyApp", {
//   sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
//     owner: "BrandonP321",
//     repository: "wedding-planner",
//     oauthToken: cdk.SecretValue.secretsManager("github-token"),
//   }),
//   autoBranchCreation: {
//     pullRequestPreview: true,
//     patterns: ["feature/*", "bug/*"],
//   },
//   autoBranchDeletion: true,
//   appName: "some-app-name",
//   buildSpec: codebuild.BuildSpec.fromObjectToYaml({
//     version: 1,
//     applications: [
//       {
//         frontend: {
//           phases: {
//             preBuild: {
//               commands: ["yarn install"],
//             },
//             build: {
//               commands: ["yarn run build"],
//             },
//           },
//           artifacts: {
//             baseDirectory: "build",
//             files: ["**/*"],
//           },
//         },
//         appRoot: "packages/web/main",
//       },
//     ],
//   }),
// });

// const mainBranch = amplifyApp.addBranch("main");

// amplifyApp.addCustomRule(
//   amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
// );
