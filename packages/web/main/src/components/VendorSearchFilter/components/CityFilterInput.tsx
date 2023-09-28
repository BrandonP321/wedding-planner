import {
  useCitySuggestions,
  FormField,
  InputField,
  InputSuggestions,
  TextUtils,
} from "@wedding-planner/shared";
import { useFormikContext } from "formik";
import { useState } from "react";
import { VendorFilterValues, FilterField } from "./VendorFilterFormik";

export const VendorCityFilter = () => {
  const [isSuggestionFocused, setIsSuggestionFocused] = useState(false);

  const { values, setValues } = useFormikContext<VendorFilterValues>();
  const { citySuggestions, clearSuggestions } = useCitySuggestions(values.city);

  return (
    <FormField name={FilterField.CITY} label="City">
      <InputField
        autoComplete={false}
        isSuggestionFocused={isSuggestionFocused}
        suggestions={
          <InputSuggestions
            suggestions={citySuggestions}
            setIsFocused={setIsSuggestionFocused}
            onSuggestionClick={({ description }) => {
              setValues({ ...values, city: description });
              clearSuggestions();
            }}
          >
            {(s) => {
              const modifiedCityName = TextUtils.getBoldenedMatchedText(
                s.description,
                values.city
              );

              return (
                <span dangerouslySetInnerHTML={{ __html: modifiedCityName }} />
              );
            }}
          </InputSuggestions>
        }
      />
    </FormField>
  );
};
