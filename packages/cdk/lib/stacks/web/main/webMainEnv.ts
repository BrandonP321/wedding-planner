import { Stage } from "@wedding-planner/shared/common/types/environment";
import { WebMainProcessEnv } from "@wedding-planner/shared/web/types/webMainEnv";
import * as codebuild from "aws-cdk-lib/aws-codebuild";

export type CDKEnvVars<T extends {}> = {
  [name in keyof T]: codebuild.BuildEnvironmentVariable;
};

/** API environment to point react app at */
const APIStageMap: Record<Stage, Stage> = {
  [Stage.LOCAL]: Stage.LOCAL,
  [Stage.DEV]: Stage.DEV,
  [Stage.STAGING]: Stage.PROD,
  [Stage.PROD]: Stage.PROD,
};

// Pipeline stack needs to be redeployed
// after making changes to env vars
export const getWebMainEnvVars = (
  stage: Stage
): CDKEnvVars<WebMainProcessEnv> => ({
  REACT_APP_STAGE: {
    value: stage,
  },
  REACT_APP_API_STAGE: {
    value: APIStageMap[stage],
  },
});
