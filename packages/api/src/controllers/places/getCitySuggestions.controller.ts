import { MapsAPIFetcher } from "@wedding-planner/shared/common";
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

    const slimPredictions = predictions.map((p) => ({
      city: p.description,
    }));

    return res.json({ predictions: slimPredictions }).end();
  }
);
