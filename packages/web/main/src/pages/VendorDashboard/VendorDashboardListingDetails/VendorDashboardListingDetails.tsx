import React from "react";
import styles from "./VendorDashboardListingDetails.module.scss";
import {
  FormField,
  FormUtils,
  FormikSubmit,
  InputField,
  PageContent,
  SpaceBetween,
  SubmitButton,
  UnstyledForm,
} from "@wedding-planner/shared";
import { Formik } from "formik";
import { SocialMediaPlatform } from "@wedding-planner/shared/common/types";
import { ListingLinksEditor } from "./components/ListingLinksAttributeEditor";
import { ListingSocialsEditor } from "./components/ListingSocialsAttributeEditor";
import { APIFetcher } from "utils";

enum Field {
  NAME = "name",
  DESCRIPTION = "description",
  // TODO: Refactor to use exact address
  CITY = "city",
}

export type LinkValue = { name: string; url: string };
export type SocialLinkValue = {
  platform?: SocialMediaPlatform;
  url: string;
};

export const LinksFieldName = "links";
export const SocialsFieldName = "socials";

export type Values = Record<Field, string> &
  Record<SocialMediaPlatform, string> & {
    [LinksFieldName]: LinkValue[];
    [SocialsFieldName]: SocialLinkValue[];
  };

const initialValues: Values = {
  name: "",
  description: "",
  city: "",
  links: [{ name: "", url: "" }],
  socials: [{ platform: undefined, url: "" }],
  ...FormUtils.getEmptyTextFieldsFromEnum(SocialMediaPlatform),
};

export type VendorDashboardListingDetailsProps = {};

export const VendorDashboardListingDetails = (
  props: VendorDashboardListingDetailsProps
) => {
  const handleSubmit: FormikSubmit<Values> = async (values) => {
    // remove empty links & socials
    const links = values[LinksFieldName].filter((l) => l.name && l.url);
    const socials = values[SocialsFieldName].filter(
      (s): s is Required<SocialLinkValue> => !!(s.platform && s.url)
    );

    return APIFetcher.createListing({
      location: [0, 0],
      vendor: {
        ...values,
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
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <PageContent verticalPadding horizontalPadding>
      <SpaceBetween vertical align="center">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setValues }) => (
            <UnstyledForm>
              <SpaceBetween size="xxl" vertical stretchChildren>
                <h1>Listing details</h1>

                <SpaceBetween size="s" vertical stretchChildren>
                  <h3>Basic info</h3>

                  <FormField name={Field.NAME} label="Listing title">
                    <InputField autoComplete={false} placeholder="Title" />
                  </FormField>

                  <FormField name={Field.DESCRIPTION} label="Description">
                    <InputField
                      autoComplete={false}
                      placeholder="Description"
                    />
                  </FormField>

                  <FormField name={Field.CITY} label="City">
                    <InputField autoComplete={false} placeholder="City" />
                  </FormField>
                </SpaceBetween>

                <SpaceBetween size="s" vertical stretchChildren>
                  <h3>Social media</h3>
                  <ListingSocialsEditor />
                </SpaceBetween>

                <SpaceBetween size="s" vertical stretchChildren>
                  <h3>Links</h3>
                  <ListingLinksEditor />
                </SpaceBetween>

                <SpaceBetween justify="end">
                  <SubmitButton>Save</SubmitButton>
                </SpaceBetween>
              </SpaceBetween>
            </UnstyledForm>
          )}
        </Formik>
      </SpaceBetween>
    </PageContent>
  );
};
