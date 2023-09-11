import { DeploymentAccount } from "./accounts";

export const getDistributionArn = (
  distributionId: string,
  account: DeploymentAccount
) => `arn:aws:cloudfront::${account.account}:distribution/${distributionId}`;
