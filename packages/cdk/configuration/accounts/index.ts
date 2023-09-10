import { groupBy } from "lodash";
import { DeploymentAccount, DeploymentApp } from "../../lib/utils/accounts";
import { Stage } from "../../lib/utils/types";

export const getStageGroupedAccounts = (deploymentApp: DeploymentApp) => {
  return groupBy(deploymentApp.deploymentAccounts, "stage") as {
    [key in Stage]: DeploymentAccount[];
  };
};
