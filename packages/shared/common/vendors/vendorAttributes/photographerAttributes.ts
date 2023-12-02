import { VendorAttributeGroup } from ".";

export enum PhotographerMainChoiceAttribute {
  EXPERIENCE_LEVEL_BEGINNER = "mcAttribute_photographerExperienceLevelBeginner",
  EXPERIENCE_LEVEL_INTERMEDIATE = "mcAttribute_photographerExperienceLevelIntermediate",
  EXPERIENCE_LEVEL_ADVANCED = "mcAttribute_photographerExperienceLevelAdvanced",
  STYLE_CANDID = "mcAttribute_photographerStyleCandid",
  STYLE_ARTISTIC = "mcAttribute_photographerStyleArtistic",
  STYLE_DOCUMENTARY = "mcAttribute_photographerStyleDocumentary",
  STYLE_TRADITIONAL = "mcAttribute_photographerStyleTraditional",
}

export const photographerMainChoiceAttributeGroups: VendorAttributeGroup[] = [
  {
    groupName: "Experience Level",
    attributes: [
      {
        label: "Beginner",
        value: PhotographerMainChoiceAttribute.EXPERIENCE_LEVEL_BEGINNER,
      },
      {
        label: "Intermediate",
        value: PhotographerMainChoiceAttribute.EXPERIENCE_LEVEL_INTERMEDIATE,
      },
      {
        label: "Advanced",
        value: PhotographerMainChoiceAttribute.EXPERIENCE_LEVEL_ADVANCED,
      },
    ],
  },
  {
    groupName: "Style",
    attributes: [
      {
        label: "Candid",
        value: PhotographerMainChoiceAttribute.STYLE_CANDID,
      },
      {
        label: "Artistic",
        value: PhotographerMainChoiceAttribute.STYLE_ARTISTIC,
      },
      {
        label: "Documentary",
        value: PhotographerMainChoiceAttribute.STYLE_DOCUMENTARY,
      },
      {
        label: "Traditional",
        value: PhotographerMainChoiceAttribute.STYLE_TRADITIONAL,
      },
    ],
  },
];
