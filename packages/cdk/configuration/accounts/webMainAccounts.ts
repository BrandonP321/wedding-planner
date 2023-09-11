import { DeploymentAccount, DeploymentApp } from "../../lib/utils/accounts";
import { Stage } from "../../lib/utils/types";

export const WebMainDeploymentApp = new DeploymentApp({
  appName: "WebMain",
  deploymentAccounts: [
    new DeploymentAccount({ stage: Stage.DEV }),
    new DeploymentAccount({ stage: Stage.STAGING }),
    new DeploymentAccount({ stage: Stage.PROD }),
  ],
});
