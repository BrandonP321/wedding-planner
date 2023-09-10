import { Construct } from "constructs";
import { DeploymentAccount, DeploymentStackParams } from "./accounts";
import * as s3 from "aws-cdk-lib/aws-s3";
import { getUniqueResourceName } from "./helpers";

export const createReactWebsiteS3Bucket = (
  scope: Construct,
  account: DeploymentAccount
) => {
  return new s3.Bucket(scope, getUniqueResourceName(account, "SiteBucket"), {
    websiteIndexDocument: "index.html",
    websiteErrorDocument: "index.html",
    publicReadAccess: true,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
  });
};
