import { getStageGroupedAccounts } from "../../configuration/accounts";
import { getDeploymentStackName } from "./helpers";
import { Region, Stage } from "./types";

export const defaultRegion = Region.US_EAST_1;
export const defaultAccountId = "757269603777";

export type DeploymentAccountParams = {
  stage: Stage;
  region?: Region;
  account?: string;
};

export class DeploymentAccount {
  stage: Stage;
  region: Region;
  account: string;
  appName: string;

  get deploymentStackName() {
    return getDeploymentStackName(this);
  }

  constructor({
    stage,
    region = defaultRegion,
    account = defaultAccountId,
  }: DeploymentAccountParams) {
    this.stage = stage;
    this.region = region;
    this.account = account;
  }
}

type DeploymentAppParams = {
  appName: string;
  deploymentAccounts: DeploymentAccount[];
};

export class DeploymentApp {
  appName: string;
  deploymentAccounts: DeploymentAccount[];

  public get stageGroups() {
    return getStageGroupedAccounts(this);
  }

  constructor({ deploymentAccounts, appName }: DeploymentAppParams) {
    deploymentAccounts.forEach((account) => {
      account.appName = appName;
    });

    this.deploymentAccounts = deploymentAccounts;
    this.appName = appName;
  }
}

export type DeploymentStackParams = DeploymentAccountParams &
  Pick<DeploymentAppParams, "appName">;
