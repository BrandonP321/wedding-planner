import { DeploymentAccount, DeploymentApp } from "../../lib/utils/accounts";
import { Stage } from "@wedding-planner/shared/common/types/environment";

export const WebMainDeploymentApp = new DeploymentApp({
  appName: "WebMain",
  deploymentAccounts: [
    new DeploymentAccount({ stage: Stage.DEV }),
    new DeploymentAccount({ stage: Stage.STAGING }),
    new DeploymentAccount({ stage: Stage.PROD }),
  ],
});
