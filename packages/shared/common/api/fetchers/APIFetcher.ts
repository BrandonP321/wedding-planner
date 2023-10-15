import { APIFetcherBase } from "../../utils";
import { GetCitySuggestionsReq } from "../requests/maps.requests";
import { APIRoute } from "../routes";

export class APIFetcherInternal extends APIFetcherBase {
  getCitySuggestions = (params: GetCitySuggestionsReq.ReqBody) =>
    this.post<GetCitySuggestionsReq.ResBody>(
      APIRoute.Places.GetCitySuggestions,
      params
    );
}
