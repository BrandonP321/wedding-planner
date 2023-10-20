import { MainChoiceAttributesDropdownFilter } from "../components/MainChoiceAttributesDropdownFilter";
import { PhotographerFilterTypes } from "@wedding-planner/shared/common/types";

export const PhotographerFilterForm = () => (
  <>
    <MainChoiceAttributesDropdownFilter
      label="Experience level"
      options={[
        {
          label: "All experience levels",
          value: "",
        },
        {
          label: "Beginner",
          value:
            PhotographerFilterTypes.MainChoiceFilter.EXPERIENCE_LEVEL_BEGINNER,
        },
        {
          label: "Intermediate",
          value:
            PhotographerFilterTypes.MainChoiceFilter
              .EXPERIENCE_LEVEL_INTERMEDIATE,
        },
        {
          label: "Advanced",
          value:
            PhotographerFilterTypes.MainChoiceFilter.EXPERIENCE_LEVEL_ADVANCED,
        },
      ]}
    />

    <MainChoiceAttributesDropdownFilter
      label="Photography style"
      options={[
        {
          label: "All styles",
          value: "",
        },
        {
          label: "Candid",
          value: PhotographerFilterTypes.MainChoiceFilter.STYLE_CANDID,
        },
        {
          label: "Documentary",
          value: PhotographerFilterTypes.MainChoiceFilter.STYLE_DOCUMENTARY,
        },
        {
          label: "Artistic",
          value: PhotographerFilterTypes.MainChoiceFilter.STYLE_ARTISTIC,
        },
      ]}
    />
  </>
);
