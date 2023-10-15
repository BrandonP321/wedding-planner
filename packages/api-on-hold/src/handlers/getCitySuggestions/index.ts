import { MapsAPIFetcher } from "@wedding-planner/shared/common/utils/MapsAPIFetcher";
import {
  GetCitySuggestionsReq,
  MapReq,
} from "@wedding-planner/shared/common/api/requests/maps.requests";
import { LambdaHandler } from "../../utils/LambdaHandler";

type ReqBody = GetCitySuggestionsReq.ReqBody;
type ResBody = GetCitySuggestionsReq.ResBody;

export const lambdaHandler = LambdaHandler.handler<ReqBody, ResBody>(
  async ({ body, headers }, handler) => {
    const { predictions } = await MapsAPIFetcher.getCityAutocomplete(
      body.query
    );

    const slimPredictions = predictions.map(
      (p): MapReq.PlaceSuggestion => ({
        description: p.description,
      })
    );

    return handler.response({ predictions: slimPredictions });
  }
);
