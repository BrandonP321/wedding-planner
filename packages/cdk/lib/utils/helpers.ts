import { DeploymentAccount } from "./accounts";
import { Stage } from "@wedding-planner/shared/common/types/environment";

export const getUniqueResourceName = (
  account: DeploymentAccount,
  suffix: string
) => `${account.appName}-${account.stage}-${suffix}`;

export const getStageResoureName = (stage: Stage, prefix: string) =>
  `${prefix}-${stage}`;

export const getDeploymentStackName = (account: DeploymentAccount) =>
  getUniqueResourceName(account, "DeploymentStack");
