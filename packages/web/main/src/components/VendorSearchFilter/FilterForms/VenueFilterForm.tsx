import React from "react";
import { VenueFilterTypes } from "@wedding-planner/shared/common/types";
import { MainChoiceAttributesDropdownFilter } from "../components/MainChoiceAttributesDropdownFilter";
import {
  MainChoiceAttributesCheckboxFilterGroup,
  MainChoiceSingleChoiceCheckboxFilterGroup,
} from "../components/MainChoiceAttributesCheckboxFilterGroups";

export const VenueFilterForm = () => {
  return (
    <>
      <MainChoiceAttributesDropdownFilter
        label="Venue type"
        options={[
          {
            label: "All venue types",
            value: "",
          },
          {
            label: "Indoor venue",
            value: VenueFilterTypes.MainChoiceFilter.INDOOR_VENUE,
          },
          {
            label: "Outdoor venue",
            value: VenueFilterTypes.MainChoiceFilter.OUTDOOR_VENUE,
          },
        ]}
      />

      <MainChoiceAttributesCheckboxFilterGroup
        title="Venue setting"
        options={[
          {
            label: "Natural features (lake, mountains, etc.)",
            value: VenueFilterTypes.MainChoiceFilter.NATURAL_FEATURES,
          },
        ]}
      />

      <MainChoiceAttributesCheckboxFilterGroup
        title="Accomodations"
        options={[
          {
            label: "Wheelchair accessible",
            value: VenueFilterTypes.MainChoiceFilter.WHEELCHAIR_ACCESSIBLE,
          },
          {
            label: "Parking",
            value: VenueFilterTypes.MainChoiceFilter.PARKING,
          },
          {
            label: "Pet friendly",
            value: VenueFilterTypes.MainChoiceFilter.PET_FRIENDLY,
          },
          {
            label: "Dressing rooms",
            value: VenueFilterTypes.MainChoiceFilter.DRESSING_ROOM,
          },
          {
            label: "Wifi",
            value: VenueFilterTypes.MainChoiceFilter.WIFI,
          },
          {
            label: "Kitchen",
            value: VenueFilterTypes.MainChoiceFilter.KITCHEN,
          },
          {
            label: "Outside catering allowed",
            value: VenueFilterTypes.MainChoiceFilter.BYOB_CATERING,
          },
        ]}
      />

      <MainChoiceSingleChoiceCheckboxFilterGroup
        title="Add-ons"
        options={[
          {
            label: "Entertainment system",
            value: VenueFilterTypes.SingleChoiceFilter.ENTERTAINMENT_SYSTEM,
          },
        ]}
      />
    </>
  );
};
