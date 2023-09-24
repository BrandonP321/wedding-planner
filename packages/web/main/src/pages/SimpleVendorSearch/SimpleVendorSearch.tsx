import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";
import {
  GetCitySuggestionsReq,
  MapReq,
} from "@wedding-planner/shared/common/api/requests/maps.requests";
import { Link } from "react-router-dom";

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

const fetchCities = async (input: string) => {
  console.log("searching for", input);

  return APIFetcher.getCitySuggestions({ query: input })
    .then((res) => res.predictions)
    .catch(() => []);
};

const SimpleVendorSearchInput = () => {
  const {
    values: { vendorSearch },
  } = useFormikContext<{ vendorSearch: string }>();

  const latestCitiesRequest = useRef<Symbol | null>(null);
  const [cities, setCities] = useState<MapReq.PlaceSuggestion[] | null>(null);

  const getCities = useCallback(
    throttle(
      (query: string) => {
        const requestSymbol = Symbol();
        latestCitiesRequest.current = requestSymbol;

        APIFetcher.getCitySuggestions({ query: query })
          .then((res) => res.predictions)
          .catch(() => [])
          .then((res) => {
            if (latestCitiesRequest.current === requestSymbol) {
              setCities(res);
            }
          });
      },
      500,
      { trailing: true }
    ),
    []
  );

  useEffect(() => {
    if (vendorSearch) {
      getCities(vendorSearch);
    }
  }, [vendorSearch, getCities]);

  return (
    <SpaceBetween classes={{ root: styles.inputWrapper }} vertical>
      <FormField
        name="vendorSearch"
        classes={{ root: styles.searchBarFormField }}
      >
        <InputField />
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
      to={`/temp-result?city=${encodeURIComponent(description)}`}
      dangerouslySetInnerHTML={{ __html: modifiedCityName }}
    />
  );
};
