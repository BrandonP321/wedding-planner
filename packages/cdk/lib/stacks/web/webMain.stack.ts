import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { DeploymentAccount } from "../../utils/accounts";
import { createReactWebsiteS3Bucket } from "../../utils/s3ResourceHelpers";
import { getUniqueResourceName } from "../../utils/helpers";

export class WebMainStack extends cdk.Stack {
  deploymentAccount: DeploymentAccount;
  websiteBucket: s3.Bucket;
  hostedZone: route53.IHostedZone;
  siteCertificate: acm.Certificate;
  cfDistribution: cloudfront.CloudFrontWebDistribution;
  WEB_APP_DOMAIN = "bpdev-temp.com";

  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps & {
      account: DeploymentAccount;
    }
  ) {
    super(scope, id, props);
    const { account } = props;

    this.deploymentAccount = account;
    this.websiteBucket = createReactWebsiteS3Bucket(this, account);

    new cdk.CfnOutput(this, "WebsiteBucketName", {
      value: this.websiteBucket.bucketName,
    });

    new cdk.CfnOutput(this, "CloudFrontDistributionId", {
      value: this.cfDistribution.distributionId,
    });

    this.getAndStoreHostedZone();
    this.addSiteCertificate();
    this.addCloudFrontDistribution();
    this.createARecord();
  }

  private getAndStoreHostedZone() {
    this.hostedZone = route53.HostedZone.fromLookup(
      this,
      getUniqueResourceName(this.deploymentAccount, "HostedZone"),
      {
        domainName: this.WEB_APP_DOMAIN,
      }
    );
  }

  private addSiteCertificate() {
    this.siteCertificate = new acm.Certificate(
      this,
      getUniqueResourceName(this.deploymentAccount, "SiteCertificate"),
      {
        domainName: this.WEB_APP_DOMAIN,
        validation: acm.CertificateValidation.fromDns(this.hostedZone),
      }
    );
  }

  private addCloudFrontDistribution() {
    this.cfDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      getUniqueResourceName(this.deploymentAccount, "CFDistribution"),
      {
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          this.siteCertificate,
          {
            aliases: [this.WEB_APP_DOMAIN],
          }
        ),
        originConfigs: [
          {
            customOriginSource: {
              domainName: this.websiteBucket.bucketWebsiteDomainName,
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
  }

  private createARecord() {
    new route53.ARecord(
      this,
      getUniqueResourceName(this.deploymentAccount, "SiteAliasRecord"),
      {
        recordName: this.WEB_APP_DOMAIN,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.cfDistribution)
        ),
        zone: this.hostedZone,
      }
    );
  }
}
