import {
  CheckboxField,
  CheckboxFormField,
  getEmptyInitialValues,
} from "@wedding-planner/shared";

export enum PhotographerField {
  PHOTO_TYPE = "photographyType",
}

export enum PhotoTypeCheckboxValue {
  WEDDING = "wedding",
  ENGAGEMENT = "engagement",
  FAMILY = "family",
}

export const photographerInitialValues = getEmptyInitialValues({
  checkboxFields: {
    [PhotographerField.PHOTO_TYPE]: PhotoTypeCheckboxValue,
  },
  inputFields: {},
  radioFields: {},
  selectFields: {},
  toggleFields: {},
});

export const PhotographerFilterForm = () => (
  <>
    <CheckboxFormField name={PhotographerField.PHOTO_TYPE} label="Photo Type">
      <CheckboxField label="Wedding" value={PhotoTypeCheckboxValue.WEDDING} />
      <CheckboxField
        label="Engagement"
        value={PhotoTypeCheckboxValue.ENGAGEMENT}
      />
      <CheckboxField label="Family" value={PhotoTypeCheckboxValue.FAMILY} />
    </CheckboxFormField>
  </>
);
