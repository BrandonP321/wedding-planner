import { DeploymentAccount, DeploymentApp } from "../../lib/utils/accounts";
import { Stage } from "../../lib/utils/types";

export const APIDeploymentApp = new DeploymentApp({
  appName: "API",
  deploymentAccounts: [
    new DeploymentAccount({ stage: Stage.DEV }),
    new DeploymentAccount({ stage: Stage.STAGING }),
    new DeploymentAccount({ stage: Stage.PROD }),
  ],
});

export const APILocalApp = new DeploymentApp({
  appName: "API",
  deploymentAccounts: [new DeploymentAccount({ stage: Stage.LOCAL })],
});
