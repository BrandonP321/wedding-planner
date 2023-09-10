import { DeploymentAccount } from "./accounts";

export const getUniqueResourceName = (
  account: DeploymentAccount,
  suffix: string
) => `${account.appName}-${account.stage}-${suffix}`;

export const getDeploymentStackName = (account: DeploymentAccount) =>
  getUniqueResourceName(account, "DeploymentStack");
