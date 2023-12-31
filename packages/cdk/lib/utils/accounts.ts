import { getStageGroupedAccounts } from "../../configuration/accounts";
import { getDeploymentStackName } from "./helpers";
import { Region } from "./types";
import { Stage } from "@wedding-planner/shared/common/types/environment";

export const defaultRegion = Region.US_EAST_1;
export const defaultAccountId = "757269603777";

const StageNameMap: { [key in Stage]: string } = {
  dev: "Dev",
  prod: "Prod",
  staging: "Staging",
  local: "Local",
};

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

  get isLocalStage() {
    return this.stage === Stage.LOCAL;
  }
  get isDevStage() {
    return this.stage === Stage.DEV;
  }
  get isStagingStage() {
    return this.stage === Stage.STAGING;
  }
  get isProdStage() {
    return this.stage === Stage.PROD;
  }

  get deploymentStackName() {
    return getDeploymentStackName(this);
  }

  get stageName() {
    return StageNameMap[this.stage];
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
