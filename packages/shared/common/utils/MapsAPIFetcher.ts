import { Stage } from "../types/environment";
import { APIFetcherBase } from "./APIFetcherBase";

// TODO: Invalidate API key and store new key in env variable
const API_KEY = "AIzaSyDlhQKdtBRYVgwNle7wP4ZQuG1gWaaWtwY";

type GoogleMapsPlacePrediction = {
  description: string;
};

type MapsPlaceAutoCompleteResponse = {
  predictions: GoogleMapsPlacePrediction[];
};

class MapsAPIFetcherInternal extends APIFetcherBase {
  protected apiDomainMap = {
    [Stage.LOCAL]: "",
    [Stage.DEV]: "",
    [Stage.STAGING]: "",
    [Stage.PROD]: "",
  };
  protected withCredentials = false;

  public getCityAutocomplete = (city: string) => {
    return this.get<MapsPlaceAutoCompleteResponse>(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${API_KEY}&components=country:us`
    );
  };
}

export const MapsAPIFetcher = new MapsAPIFetcherInternal({});
