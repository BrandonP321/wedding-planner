import {
  CheckboxField,
  CheckboxFormField,
  getEmptyInitialValues,
} from "@wedding-planner/shared";

export enum CatererCheckboxField {
  CUISINE_TYPE = "cuisineType",
}

export enum CuisineTypeCheckboxValue {
  ITALIAN = "italian",
  MEXICAN = "mexican",
  AMERICAN = "american",
}

export const catererInitialValues = getEmptyInitialValues({
  checkboxFields: {
    [CatererCheckboxField.CUISINE_TYPE]: CuisineTypeCheckboxValue,
  },
  inputFields: {},
  radioFields: {},
  selectFields: {},
  toggleFields: {},
});

export const CaterergrapherFilterForm = () => (
  <>
    <CheckboxFormField
      name={CatererCheckboxField.CUISINE_TYPE}
      label="Cuisine Type"
    >
      <CheckboxField label="Italian" value={CuisineTypeCheckboxValue.ITALIAN} />
      <CheckboxField label="Mexican" value={CuisineTypeCheckboxValue.MEXICAN} />
      <CheckboxField
        label="American"
        value={CuisineTypeCheckboxValue.AMERICAN}
      />
    </CheckboxFormField>
  </>
);
