import { APIFetcherInternal } from "@wedding-planner/shared/common/api/fetchers";

export const APIFetcher = new APIFetcherInternal({
  apiStage: process.env.REACT_APP_API_STAGE,
});
