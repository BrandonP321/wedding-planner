import React, { useMemo } from "react";
import styles from "./VendorDashboardListingDetails.module.scss";
import {
  Container,
  FormField,
  FormUtils,
  FormikSubmit,
  InputField,
  NumberInput,
  PageContent,
  SpaceBetween,
  SpinnerWrapper,
  SubmitButton,
  UnstyledForm,
} from "@wedding-planner/shared";
import { Formik } from "formik";
import {
  SocialMediaPlatform,
  Vendor,
} from "@wedding-planner/shared/common/types";
import { ListingLinksEditor } from "./components/ListingLinksAttributeEditor";
import { ListingSocialsEditor } from "./components/ListingSocialsAttributeEditor";
import { APIFetcher } from "utils";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { CreateVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/createVendorListing.request";
import { VendorTypeSelect } from "components";
import { ListingLocationContainer } from "./components/ListingLocationContainer/ListingLocationContainer";
import { LocationValues } from "./components/ListingLocationContainer/LocationForm";

enum Field {
  NAME = "name",
  DESCRIPTION = "description",
}

enum NumberField {
  SERVICEABLE_RADIUS = "serviceableRadius",
}

export type LinkValue = { name: string; url: string };
export type SocialLinkValue = {
  platform?: SocialMediaPlatform;
  url: string;
};

export const LinksFieldName = "links";
export const SocialsFieldName = "socials";
const VendorTypeFieldName = "vendorType";

export type Values = Record<Field, string> &
  Record<NumberField, number> &
  Record<SocialMediaPlatform, string> & {
    [LinksFieldName]: LinkValue[];
    [SocialsFieldName]: SocialLinkValue[];
    [VendorTypeFieldName]: Vendor.VendorType | undefined;
    location: LocationValues;
  };

const blankLink: LinkValue = { name: "", url: "" };
const blankSocial: SocialLinkValue = { platform: undefined, url: "" };

export type VendorDashboardListingDetailsProps = {};

export const VendorDashboardListingDetails = (
  props: VendorDashboardListingDetailsProps
) => {
  const { listing, loading } = useAuthedVendorListing({ reFetchOnMount: true });

  const handleSubmit: FormikSubmit<Values> = async ({
    location,
    ...values
  }) => {
    const vendorType = values[VendorTypeFieldName];

    if (!vendorType) {
      // TODO: Consider handling this even though Yup should have caught it
      return;
    }

    // remove empty links & socials
    const links = values[LinksFieldName].filter((l) => l.name && l.url);
    const socials = values[SocialsFieldName].filter(
      (s): s is Required<SocialLinkValue> => !!(s.platform && s.url)
    );

    const request: CreateVendorListingRequest.ReqBody = {
      vendor: {
        ...values,
        ...location,
        vendorType,
        links: links.map((l) => ({
          label: l.name,
          url: l.url,
          type: "custom",
        })),
        socialLinks: socials.map((s) => ({
          label: s.platform,
          type: s.platform,
          url: s.url,
        })),
      },
    };

    if (!listing) {
      // Create listing if one doesn't already exist
      return APIFetcher.createListing(request)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      // Else update existing listing
      return APIFetcher.updateListing(request)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const initialValues: Values = useMemo(() => {
    const links: LinkValue[] =
      listing && (listing?.links?.length ?? 0) >= 1
        ? listing.links.map((l) => ({ name: l.label, url: l.url }))
        : [blankLink];

    const socials =
      listing && (listing?.socialLinks?.length ?? 0) >= 1
        ? listing?.socialLinks?.map((l) => ({
            platform: l.type as SocialMediaPlatform,
            url: l.url,
          }))
        : [blankSocial];

    const location: LocationValues = {
      streetAddress: listing?.state ?? "",
      city: listing?.city ?? "",
      state: listing?.state ?? "",
      zipCode: listing?.zipCode ?? "",
      lat: listing?.lat ?? 0,
      lng: listing?.lng ?? 0,
    };

    return {
      name: listing?.name ?? "",
      description: listing?.description ?? "",
      city: listing?.city ?? "",
      vendorType: listing?.vendorType,
      links,
      socials,
      location,
      serviceableRadius: listing?.serviceableRadius ?? 0,
      ...FormUtils.getEmptyTextFieldsFromEnum(SocialMediaPlatform),
    };
  }, [listing]);

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpinnerWrapper isLoading={loading} align="start">
        <SpaceBetween vertical align="center">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <UnstyledForm>
              <SpaceBetween size="xxl" vertical stretchChildren>
                <h1>Listing details</h1>

                <Container header={<h3>Basic info</h3>}>
                  <SpaceBetween size="s" vertical stretchChildren>
                    <FormField name={VendorTypeFieldName} label="Vendor type">
                      <VendorTypeSelect />
                    </FormField>

                    <FormField name={Field.NAME} label="Listing title">
                      <InputField autoComplete={false} placeholder="Title" />
                    </FormField>

                    <FormField name={Field.DESCRIPTION} label="Description">
                      <InputField
                        autoComplete={false}
                        placeholder="Description"
                      />
                    </FormField>

                    <FormField
                      name={NumberField.SERVICEABLE_RADIUS}
                      label="Serviceable radius"
                    >
                      <NumberInput min={0} />
                    </FormField>
                  </SpaceBetween>
                </Container>

                <ListingLocationContainer />

                <Container header={<h3>Social media</h3>}>
                  <SpaceBetween size="s" vertical stretchChildren>
                    <ListingSocialsEditor />
                  </SpaceBetween>
                </Container>

                <Container header={<h3>Links</h3>}>
                  <SpaceBetween size="s" vertical stretchChildren>
                    <ListingLinksEditor />
                  </SpaceBetween>
                </Container>

                <SpaceBetween justify="end">
                  <SubmitButton>Save</SubmitButton>
                </SpaceBetween>
              </SpaceBetween>
            </UnstyledForm>
          </Formik>
        </SpaceBetween>
      </SpinnerWrapper>
    </PageContent>
  );
};
