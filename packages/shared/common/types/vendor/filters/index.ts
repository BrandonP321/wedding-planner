import { VenueFilterTypes } from "./venueFilters.types";

export * from "./venueFilters.types";

export enum BaseFilterType {
  MAX_PRICE = "maxPrice",
}

export type VendorMainChoiceFilterType = VenueFilterTypes.MainChoiceFilter;

export type VendorChoiceGroupFilterType =
  | "custom"
  | VenueFilterTypes.ChoiceGroupFilter;
