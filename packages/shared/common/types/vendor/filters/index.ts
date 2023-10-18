import { VenueFilterTypes } from "./venueFilters.types";

export * from "./venueFilters.types";

export enum BaseFilterType {
  MAX_PRICE = "maxPrice",
}

export type VendorMainChoiceFilterType = VenueFilterTypes.MainChoiceFilter;

export type VendorChoiceGroupFilterType =
  | "none"
  | VenueFilterTypes.ChoiceGroupFilter;

export type VendorChoiceFilterType =
  | "none"
  | VenueFilterTypes.SingleChoiceFilter;

export namespace VendorFilterTypes {
  type ChoiceGroupFilters = {
    [key in VendorChoiceGroupFilterType]?: any;
  };

  export type Filters = {
    mainChoiceAttributes?: VendorMainChoiceFilterType[];
    choiceGroupFilters?: ChoiceGroupFilters;
    singleChoiceFilters?: VendorChoiceFilterType[];
  };
}
