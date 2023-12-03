import {
  Button,
  FormActions,
  FormField,
  Header,
  InputField,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { FormSpaceBetween } from "components/SpaceBetween/SpaceBetween";
import { useFormikContext } from "formik";
import { LocationSuggestions } from "./ListingLocationContainer";
import { LocationSuggestionCard } from "./LocationSuggestionCard";
import { APIFetcher } from "utils";

export enum LocationField {
  STREET_ADDRESS = "streetAddress",
  CITY = "city",
  STATE = "state",
  ZIP_CODE = "zipCode",
}

export enum LocationNumberField {
  LAT = "lat",
  LNG = "lng",
}

export type LocationValues = Record<LocationField, string> &
  Record<LocationNumberField, number>;

type Props = {
  suggestions: LocationSuggestions;
  updateValues: (values: LocationValues) => void;
};

export const LocationForm = ({ suggestions, updateValues }: Props) => {
  const { submitForm, setValues, values } = useFormikContext<LocationValues>();

  const handleLocationSuggestionClick = async (placeId: string) => {
    return await APIFetcher.getAddressDetails({ placeId })
      .then((res) => {
        setValues({ ...values, ...res });
        updateValues(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SpaceBetween size="l" stretchChildren vertical>
      <FormSpaceBetween stretchChildren>
        <FormField name={LocationField.STREET_ADDRESS} label="Street address">
          <InputField placeholder="Street address" />
        </FormField>

        <FormField name={LocationField.CITY} label="City">
          <InputField placeholder="City" />
        </FormField>

        <FormField name={LocationField.STATE} label="State">
          <InputField placeholder="State" />
        </FormField>

        <FormField name={LocationField.ZIP_CODE} label="Zip code">
          <InputField placeholder="Zip code" />
        </FormField>

        <FormActions>
          <Button onClick={submitForm}>Search</Button>
        </FormActions>
      </FormSpaceBetween>

      <SpaceBetween stretchChildren size="s">
        <Header title="Suggested locations" variant="h4" />
        <SpaceBetween vertical size="xs">
          {suggestions?.map((s) => (
            <LocationSuggestionCard
              key={s.placeId}
              address={s.description}
              onClick={() => handleLocationSuggestionClick(s.placeId)}
            />
          ))}
        </SpaceBetween>
      </SpaceBetween>
    </SpaceBetween>
  );
};
