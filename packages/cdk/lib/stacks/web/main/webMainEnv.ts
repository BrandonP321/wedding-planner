import { WebMainProcessEnv } from "@wedding-planner/shared/web/types/webMainEnv";
import { Stage } from "../../../utils/types";
import * as codebuild from "aws-cdk-lib/aws-codebuild";

export type CDKEnvVars<T extends {}> = {
  [name in keyof T]: codebuild.BuildEnvironmentVariable;
};

export const getWebMainEnvVars = (
  stage: Stage
): CDKEnvVars<WebMainProcessEnv> => ({
  REACT_APP_STAGE: {
    value: stage,
  },
});
