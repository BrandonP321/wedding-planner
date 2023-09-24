import React, { useEffect } from "react";
import styles from "./SimpleVendorSearch.module.scss";
import {
  InputField,
  FormField,
  SpaceBetween,
  FormikForm,
} from "@wedding-planner/shared/web/components";
import { useFormikContext } from "formik";
import { debounce, throttle } from "lodash";
import { MapsAPIFetcher } from "@wedding-planner/shared";
import { APIFetcher } from "utils";
import { useFetch } from "@wedding-planner/shared/web/store";

export type SimpleVendorSearchProps = {};

export const SimpleVendorSearch = (props: SimpleVendorSearchProps) => {
  return (
    <div className={styles.searchPage}>
      <SpaceBetween classes={{ root: styles.mainContent }} vertical>
        <h1>Some App Logo</h1>
        <FormikForm initialValues={{ vendorSearch: "" }} onSubmit={() => {}}>
          <SimpleVendorSearchInput />
        </FormikForm>
      </SpaceBetween>
    </div>
  );
};

const fetchCities = debounce(
  async (input: string) => {
    console.log("searching for", input);

    return APIFetcher.getCitySuggestions({ query: input })
      .then((res) => res.predictions)
      .catch(() => []);
  },
  500,
  { trailing: true }
);

const SimpleVendorSearchInput = () => {
  const {
    values: { vendorSearch },
  } = useFormikContext<{ vendorSearch: string }>();

  const { makeAPICall: getCities, response: cities } = useFetch(fetchCities, {
    fetchOnMount: false,
  });

  useEffect(() => {
    if (vendorSearch) {
      getCities(vendorSearch);
      // fetchCities(vendorSearch)?.then((res) => console.log(res));
    }
  }, [vendorSearch, getCities]);

  return (
    <div className={styles.inputWrapper}>
      <FormField
        name="vendorSearch"
        classes={{ root: styles.searchBarFormField }}
      >
        <InputField />
      </FormField>
      {cities?.map((c, i) => {
        return <div key={i}>{c.description}</div>;
      })}
    </div>
  );
};
