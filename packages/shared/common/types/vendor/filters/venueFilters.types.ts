export namespace VenueFilterTypes {
  export enum MainChoiceFilter {
    OUTDOOR_VENUE = "outdoorVenue",
    INDOOR_VENUE = "indoorVenue",
    WHEELCHAIR_ACCESSIBLE = "wheelchairAccessible",
    KITCHEN = "kitchen",
    PARKING = "parking",
    WIFI = "wifi",
    PET_FRIENDLY = "petFriendly",
    DRESSING_ROOM = "dressingRoom",
    BYOB_CATERING = "byobCatering",
    NATURAL_FEATURES = "naturalFeatures",
  }

  export enum ChoiceGroupFilter {
    GUEST_CAPACITY = "guestCapacity",
  }

  export enum SingleChoiceFilter {
    ENTERTAINMENT_SYSTEM = "entertainmentSystem",
  }
}
