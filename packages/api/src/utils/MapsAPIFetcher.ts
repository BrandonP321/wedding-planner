import { MapsAPIFetcherInternal } from "@wedding-planner/shared/common/utils/MapsAPIFetcher";

export const MapsAPIFetcher = new MapsAPIFetcherInternal(
  process.env.GOOGLE_API_KEY ?? ""
);
