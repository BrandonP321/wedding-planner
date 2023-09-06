import { TempAPIFetcherInternal } from "@wedding-planner/shared/common/utils";

export const TempAPIFetcher = new TempAPIFetcherInternal({
  handleAuthFail: () => {
    console.log("handleAuthFail");
  },
});
