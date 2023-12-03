import React, { useMemo, useState } from "react";
import { useAuthedVendorAccount } from "store/slices/vendorAccount/vendorAccountHooks";
import { UpdateVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/UpdateVendorAccount.request";
import { useFormikContext } from "formik";
import {
  Button,
  Container,
  FormActions,
  FormField,
  FormikForm,
  FormikSubmit,
  Header,
  InputField,
  SpaceBetween,
  SubmitButton,
  UnstyledForm,
  useCustomFormContext,
} from "@wedding-planner/shared";
import { APIFetcher } from "utils";
import { FormSpaceBetween } from "components/SpaceBetween/SpaceBetween";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

type ReqBody = UpdateVendorAccountRequest.ReqBody;

const Field: { [key in keyof ReqBody]: key } = {
  businessName: "businessName",
  email: "email",
  fullName: "fullName",
  phoneNumber: "phoneNumber",
};

export type Values = ReqBody;

export const AccountForm = () => {
  const { account } = useAuthedVendorAccount();
  const { setIsEditable } = useCustomFormContext();

  const initialValues = useMemo<Values>(
    () => ({
      businessName: account?.businessName ?? "",
      email: account?.email ?? "",
      fullName: account?.fullName ?? "",
      phoneNumber: account?.phoneNumber ?? "",
    }),
    [account]
  );

  const handleSubmit: FormikSubmit<Values> = async (values, formik) => {
    return await APIFetcher.updateVendorAccount(values)
      .then(() => {
        formik.resetForm({ values });
        setIsEditable(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <FormikForm initialValues={initialValues} onSubmit={handleSubmit}>
      <UnstyledForm>
        <SpaceBetween size="xl" vertical stretch stretchChildren>
          <Header title="Account management" description={lorem} />

          <Container
            header={<Header title="Basic info" variant="h3" />}
            footer={<AccountFormActions />}
          >
            <FormSpaceBetween stretchChildren>
              <FormField name={Field.email} label="Email">
                <InputField placeholder="Email" />
              </FormField>

              <FormField name={Field.fullName} label="Full name">
                <InputField placeholder="Full name" />
              </FormField>

              <FormField name={Field.phoneNumber} label="Phone number">
                <InputField placeholder="Phone number" />
              </FormField>

              <FormField name={Field.businessName} label="Business name">
                <InputField placeholder="Business name" />
              </FormField>
            </FormSpaceBetween>
          </Container>
        </SpaceBetween>
      </UnstyledForm>
    </FormikForm>
  );
};

const AccountFormActions = () => {
  const { resetForm } = useFormikContext<Values>();
  const { setIsEditable, isEditable } = useCustomFormContext();

  const cancelEditing = () => {
    setIsEditable(false);
    resetForm();
  };

  return (
    <FormActions>
      {!isEditable && (
        <Button onClick={() => setIsEditable(true)} variant="primary">
          Edit
        </Button>
      )}
      {isEditable && (
        <>
          <Button onClick={cancelEditing}>Cancel</Button>
          <SubmitButton>Save</SubmitButton>
        </>
      )}
    </FormActions>
  );
};
