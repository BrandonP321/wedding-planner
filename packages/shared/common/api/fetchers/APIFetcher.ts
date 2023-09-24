import { APIFetcherBase } from "../../utils";
import { GetCitySuggestionsReq } from "../requests/maps.requests";
import { APIRoutes } from "../routes/apiRoutes";

export class APIFetcherInternal extends APIFetcherBase {
  getCitySuggestions = (params: GetCitySuggestionsReq.ReqBody) =>
    this.post<GetCitySuggestionsReq.ResBody>(
      APIRoutes.GetCitySuggestions,
      params
    );
}
