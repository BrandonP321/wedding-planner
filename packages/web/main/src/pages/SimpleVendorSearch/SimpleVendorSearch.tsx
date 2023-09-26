import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SimpleVendorSearch.module.scss";
import {
  InputField,
  FormField,
  SpaceBetween,
  FormikForm,
} from "@wedding-planner/shared/web/components";
import { useFormikContext } from "formik";
import { throttle } from "lodash";
import { APIFetcher } from "utils";
import { MapReq } from "@wedding-planner/shared/common/api/requests/maps.requests";
import { Link } from "react-router-dom";
import { RouteHelper } from "utils/RouteHelper";

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

const SimpleVendorSearchInput = () => {
  const {
    values: { vendorSearch },
  } = useFormikContext<{ vendorSearch: string }>();

  const [cities, setCities] = useState<MapReq.PlaceSuggestion[] | null>(null);

  const getCities = useCallback(
    throttle(
      (query: string) => {
        APIFetcher.getCitySuggestions({ query: query })
          .then((res) => res.predictions)
          .catch(() => [])
          .then(setCities);
      },
      // TODO: Look at increasing throttle wait to decrease total API calls and cost
      500,
      { trailing: true }
    ),
    []
  );

  useEffect(() => {
    if (vendorSearch) {
      getCities(vendorSearch);
    } else {
      setCities([]);
    }
  }, [vendorSearch, getCities]);

  return (
    <SpaceBetween classes={{ root: styles.inputWrapper }} vertical>
      <FormField
        name="vendorSearch"
        classes={{ root: styles.searchBarFormField }}
      >
        <InputField autoComplete={false} />
      </FormField>

      <div className={styles.suggestions}>
        {vendorSearch &&
          cities?.map((c, i) => {
            return <SeachResult key={i} {...c} input={vendorSearch} />;
          })}
      </div>
    </SpaceBetween>
  );
};

type SearchResultProps = MapReq.PlaceSuggestion & {
  input: string;
};

const SeachResult = ({ description, input }: SearchResultProps) => {
  const inputRegex = new RegExp(input, "gi");
  const modifiedCityName = description.replace(inputRegex, (match) => {
    return `<strong>${match}</strong>`;
  });

  return (
    <Link
      to={RouteHelper.VendorSearch(undefined, { city: description })}
      dangerouslySetInnerHTML={{ __html: modifiedCityName }}
    />
  );
};
