import { useCallback, useEffect, useRef, useState } from "react";
import { MapReq } from "../api/requests/maps.requests";
import { isEmpty, throttle } from "lodash";
import { APIFetcherInternal } from "../api/fetchers";

const APIFetcher = new APIFetcherInternal({});

export const useCitySuggestions = (query: string) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [citySuggestions, setCities] = useState<
    MapReq.PlaceSuggestion[] | null
  >(null);

  const getCities = useCallback(
    throttle(
      (query: string) => {
        APIFetcher.getCitySuggestions({ query })
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
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Only fetch after mount to ensure cities aren't fetched on page load if query is prefilled
    if (query && hasMounted) {
      getCities(query);
    } else {
      setCities([]);
    }
  }, [query, getCities]);

  const clearSuggestions = () => {
    setCities(null);
  };

  const filteredCities =
    citySuggestions?.filter((c) => c.description !== query) ?? [];

  return {
    citySuggestions: !isEmpty(filteredCities) ? filteredCities : null,
    clearSuggestions,
  };
};
