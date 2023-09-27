import styles from "./VendorSearchFilter.module.scss";
import {
  Dropdown,
  FormField,
  FormikForm,
  FormikSubmit,
  InputField,
  InputSuggestions,
  SpaceBetween,
  SubmitButton,
  getEmptyInitialValues,
} from "@wedding-planner/shared/web/components";
import {
  PhotographerFilterForm,
  photographerInitialValues,
} from "./FilterForms/PhotographerFilterForm";
import {
  CaterergrapherFilterForm,
  catererInitialValues,
} from "./FilterForms/CatererFilterForm";
import { Vendor } from "@wedding-planner/shared/common/types";
import { Form, useFormikContext } from "formik";
import {
  TextUtils,
  UrlUtils,
  useCitySuggestions,
} from "@wedding-planner/shared";
import { useMemo, useState } from "react";

const VendorFilterFormMap: Vendor.VendorTypeMap<() => JSX.Element> = {
  [Vendor.VendorType.PHOTOGRAPHER]: PhotographerFilterForm,
  [Vendor.VendorType.CATERER]: CaterergrapherFilterForm,
};

enum FilterField {
  CITY = "city",
  VENDOR_TYPE = "vendorType",
}

const initialValues = {
  ...getEmptyInitialValues({
    inputFields: FilterField,
    selectFields: {
      [FilterField.VENDOR_TYPE]: Vendor.VendorType,
    },
    checkboxFields: {},
    radioFields: {},
    toggleFields: {},
  }),
  ...catererInitialValues,
  ...photographerInitialValues,
};

export type VendorFilterValues = typeof initialValues;

type VendorSearchFilterContentProps = {
  handleSubmit: FormikSubmit<VendorFilterValues>;
};

const VendorSearchFilterContent = ({
  handleSubmit,
}: VendorSearchFilterContentProps) => {
  const prefilledCity = useMemo(
    () => UrlUtils.getParam(FilterField.CITY) ?? "",
    []
  );

  return (
    <FormikForm
      initialValues={{
        ...initialValues,
        [FilterField.VENDOR_TYPE]: Vendor.VendorType.PHOTOGRAPHER,
        [FilterField.CITY]: prefilledCity,
      }}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        const FilterForm = VendorFilterFormMap[values.vendorType];

        return (
          <Form>
            <SpaceBetween
              classes={{ root: styles.content }}
              size="l"
              vertical
              align="n"
            >
              <FormField name={FilterField.VENDOR_TYPE} label="Vendor type">
                <Dropdown
                  options={[
                    { label: "Caterer", value: "caterer" },
                    { label: "Photographer", value: "photographer" },
                  ]}
                />
              </FormField>

              <VendorCityFilter />

              <FilterForm />

              <SubmitButton>Save</SubmitButton>
            </SpaceBetween>
          </Form>
        );
      }}
    </FormikForm>
  );
};

const VendorCityFilter = () => {
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

export type VendorSearchFilterSideBarProps =
  VendorSearchFilterContentProps & {};

export const VendorSearchFilterSideBar = (
  props: VendorSearchFilterSideBarProps
) => {
  return (
    <div className={styles.sidebar}>
      <VendorSearchFilterContent {...props} />
    </div>
  );
};
