import { useMemo, useState } from "react";
import {
  Container,
  FormikForm,
  FormikSubmit,
  Header,
} from "@wedding-planner/shared/web/components";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { LocationForm, LocationValues } from "./LocationForm";
import { APIFetcher } from "utils";
import { GetAddressSuggestionsRequest } from "@wedding-planner/shared/api/requests/places/getAddressSuggestions.request";
import { useFormikContext } from "formik";
import { Values } from "../../VendorDashboardListingDetails";

export type LocationSuggestions =
  GetAddressSuggestionsRequest.ResBody["suggestions"];

export type Props = {};

export const ListingLocationContainer = (props: Props) => {
  const { listing } = useAuthedVendorListing();
  const [locationSuggestions, setLocationSuggestions] =
    useState<LocationSuggestions>([]);

  const { setValues, values } = useFormikContext<Values>();

  const initialValues: LocationValues = useMemo(
    () => ({
      streetAddress: listing?.streetAddress ?? "",
      city: listing?.city ?? "",
      state: listing?.state ?? "",
      zipCode: listing?.zipCode ?? "",
      lat: listing?.lat ?? 0,
      lng: listing?.lng ?? 0,
    }),
    [listing]
  );

  const handleSubmit: FormikSubmit<LocationValues> = async (values) => {
    return APIFetcher.getAddressSuggestions(values)
      .then(({ suggestions }) => setLocationSuggestions(suggestions))
      .catch((err) => console.log(err));
  };

  return (
    <FormikForm initialValues={initialValues} onSubmit={handleSubmit}>
      <Container header={<Header title="Location" variant="h3" />}>
        <LocationForm
          suggestions={locationSuggestions}
          updateValues={(v) => {
            console.log(v);
            setValues({ ...values, location: v });
          }}
        />
      </Container>
    </FormikForm>
  );
};
