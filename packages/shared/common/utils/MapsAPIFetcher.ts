import { Stage } from "../types/environment";
import { APIFetcherBase } from "./APIFetcherBase";

type GoogleMapsPlacePrediction = {
  description: string;
  place_id: string;
};

type MapsPlaceAutoCompleteResponse = {
  predictions: GoogleMapsPlacePrediction[];
};

type ReverseGeocodePlaceResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
};

type MapsPlaceDetailsAddressComponent = {};

type MapsPlaceDetailsResponse = {
  result: {
    address_components: MapsPlaceDetailsAddressComponent[];
    formatted_address: string;
  };
};

export class MapsAPIFetcherInternal extends APIFetcherBase {
  protected apiDomainMap = {
    [Stage.LOCAL]: "",
    [Stage.DEV]: "",
    [Stage.STAGING]: "",
    [Stage.PROD]: "",
  };
  protected withCredentials = false;

  private apiKey: string;

  constructor(apiKey: string) {
    super({});
    this.apiKey = apiKey;
  }

  public getCityAutocomplete = (city: string) => {
    return this.get<MapsPlaceAutoCompleteResponse>(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${this.apiKey}&components=country:us`
    );
  };

  public getPlaceDetails = (placeId: string) => {
    return this.get<MapsPlaceDetailsResponse>(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${this.apiKey}`
    );
  };

  public reverseGeocodePlace = (placeId: string) => {
    return this.get<ReverseGeocodePlaceResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${this.apiKey}`
    );
  };

  public getCityCoords = async (placeId: string) => {
    const result = await this.reverseGeocodePlace(placeId);
    const location = result.results[0].geometry.location;

    return location;
  };
}
