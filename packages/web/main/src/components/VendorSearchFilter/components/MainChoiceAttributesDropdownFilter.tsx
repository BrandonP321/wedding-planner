import { FormField, Dropdown } from "@wedding-planner/shared";
import { VenueFilterTypes } from "@wedding-planner/shared/common/types";
import { useFormikContext } from "formik";
import { useState } from "react";
import { VendorFilterValues } from "./VendorFilterFormik";

export type MainChoiceAttributesDropdownFilterProps = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const MainChoiceAttributesDropdownFilter = ({
  options,
  label,
}: MainChoiceAttributesDropdownFilterProps) => {
  const [currentValue, setCurrentValue] = useState("");

  const { values, setValues } = useFormikContext<VendorFilterValues>();

  const updateMainChoiceAttributes = (oldValue: string, newValue: string) => {
    let newAttributes = [...values.mainChoiceAttributes];

    if (oldValue) {
      newAttributes = newAttributes.filter((a) => a !== oldValue);
    }

    if (newValue) {
      newAttributes.push(newValue as VenueFilterTypes.MainChoiceFilter);
    }

    setValues({
      ...values,
      mainChoiceAttributes: newAttributes,
    });

    setCurrentValue(newValue);
  };

  return (
    <FormField name="" label={label}>
      <Dropdown
        options={options}
        onOptionClick={({ value }) => {
          updateMainChoiceAttributes(currentValue, value);
        }}
      />
    </FormField>
  );
};
