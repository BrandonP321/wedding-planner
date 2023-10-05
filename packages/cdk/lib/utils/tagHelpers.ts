import { Tags } from "aws-cdk-lib/core";
import { IConstruct } from "constructs";

/** Applies default tags to all resources */
export const addDefaultTags = (scope: IConstruct) => {
  Tags.of(scope).add("Application", "WP");
};

export const addWebMainTags = (scope: IConstruct) => {
  Tags.of(scope).add("Project", "WebMain");
};

export const addStageTags = (scope: IConstruct, stage: string) => {
  Tags.of(scope).add("Stage", stage);
};

export const addWebMainPipelineTags = (scope: IConstruct) => {
  Tags.of(scope).add("Project", "WebMainPipeline");
};

export const addAPIPipelineTags = (scope: IConstruct) => {
  Tags.of(scope).add("Project", "APIPipeline");
};

export const addAPITags = (scope: IConstruct) => {
  Tags.of(scope).add("Project", "API");
};
