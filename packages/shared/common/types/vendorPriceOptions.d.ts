export type VendorType = "venue" | "caterer" | "photographer";

export type VendorMainChoice = {
  id: string;
  name: string;
  basePrice: number;
  peakDatesPrice: number;
  subChoices: VendorSubChoice[];
  addOns: VendorAddOn[];
};

export type VendorSubChoice = {
  id: string;
  name: string;
  additionalPrice: number;
  peakDatesAdditionalPrice: number;
};

export type VendorAddOn = {
  id: string;
  name: string;
  additionalPrice: number;
  peakDatesAdditionalPrice: number;
};

export type VendorContactInfo = {
  phone: string;
  email: string;
  website: string;
};

export type VenueDetails = {
  venueType: string;
};
export type CatererDetails = {};
export type PhotographerDetails = {};

type VendorDetailsMap = {
  venue: VenueDetails;
  photographer: PhotographerDetails;
  caterer: CatererDetails;
};

export type VendorSpecificDetails<Type extends VendorType> = {
  [key in `${Type}Details`]: VendorDetailsMap[Type];
} & { type: Type };

export type VendorResponse =
  | {
      id: string;
      name: string;
      description: string;
      locaiton: string;
      contactInfo: VendorContactInfo;
      mainChoices: VendorMainChoice[];
    } & (
      | VendorSpecificDetails<"venue">
      | VendorSpecificDetails<"caterer">
      | VendorSpecificDetails<"photographer">
    );
