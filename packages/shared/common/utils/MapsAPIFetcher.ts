import { Stage } from "../types/environment";
import { APIFetcherBase } from "./APIFetcherBase";

export type GoogleMapsPlacePrediction = {
  description: string;
  place_id: string;
};

type MapsPlaceAutoCompleteResponse = {
  predictions: GoogleMapsPlacePrediction[];
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type GeocodeGeometry = {
  location: {
    lat: number;
    lng: number;
  };
};

export type MapsPlaceGeocodeResponse = {
  results: {
    address_components: AddressComponent[];
    geometry: GeocodeGeometry;
  }[];
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

  public getAddressSuggestions = (address: string) => {
    return this.get<MapsPlaceAutoCompleteResponse>(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        address
      )}&types=address&key=${this.apiKey}&components=country:us`
    );
  };

  public getAddressDetails = (placeId: string) => {
    return this.get<MapsPlaceGeocodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${this.apiKey}`
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
