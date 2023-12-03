import { GoogleMapsPlacePrediction } from "@wedding-planner/shared/common/utils/MapsAPIFetcher";
import { MapsAPIFetcher } from "../../utils";
import { Controller } from "../../utils/ControllerUtils";
import { GetAddressSuggestionsRequest } from "@wedding-planner/shared/api/requests/places/getAddressSuggestions.request";

const controller = new Controller<
  GetAddressSuggestionsRequest.ReqBody,
  GetAddressSuggestionsRequest.ResBody,
  {},
  typeof GetAddressSuggestionsRequest.Errors
>(GetAddressSuggestionsRequest.Errors);

export const GetAddressSuggestionsController = controller.handler(
  async ({ body }, res) => {
    const addressString = `${body.streetAddress}, ${body.city}, ${body.state}, ${body.zipCode}`;

    const { predictions } = await MapsAPIFetcher.getAddressSuggestions(
      addressString
    );

    const slimPredictions = await getSlimPredictions(predictions);

    return res.json({ suggestions: slimPredictions }).end();
  }
);

async function getSlimPredictions(predictions: GoogleMapsPlacePrediction[]) {
  return predictions.map((p) => ({
    description: p.description,
    placeId: p.place_id,
  }));
}
