import { APIFetcherBase } from "./APIFetcher";

const API_KEY = "AIzaSyDlhQKdtBRYVgwNle7wP4ZQuG1gWaaWtwY";

type GoogleMapsPlacePrediction = {
  description: string;
};

type MapsPlaceAutoCompleteResponse = {
  predictions: GoogleMapsPlacePrediction[];
};

class MapsAPIFetcherInternal extends APIFetcherBase {
  protected withCredentials = false;

  public getCityAutocomplete = (city: string) => {
    return this.get<MapsPlaceAutoCompleteResponse>(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${API_KEY}`
    );
  };
}

export const MapsAPIFetcher = new MapsAPIFetcherInternal({});
