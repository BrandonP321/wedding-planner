import { GoogleMapsPlacePrediction } from "@wedding-planner/shared/common/utils/MapsAPIFetcher";
import { MapsAPIFetcher } from "../../utils";
import { Controller } from "../../utils/ControllerUtils";
import { GetCitySuggestionsRequest } from "@wedding-planner/shared/api/requests/places/getCitySuggestions.request";

const controller = new Controller<
  GetCitySuggestionsRequest.ReqBody,
  GetCitySuggestionsRequest.ResBody,
  {},
  typeof GetCitySuggestionsRequest.Errors
>(GetCitySuggestionsRequest.Errors);

export const getCitySuggestionsController = controller.handler(
  async ({ body }, res) => {
    const { predictions } = await MapsAPIFetcher.getCityAutocomplete(
      body.query
    );

    const slimPredictions = await getSlimPredictions(predictions);

    return res.json({ predictions: slimPredictions }).end();
  }
);

async function getSlimPredictions(predictions: GoogleMapsPlacePrediction[]) {
  return predictions.map((p) => ({
    city: p.description,
    googlePlaceId: p.place_id,
  }));
}
