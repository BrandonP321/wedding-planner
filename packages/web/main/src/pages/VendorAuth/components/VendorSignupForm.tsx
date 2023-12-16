import React, { useState } from "react";
import {
  SpaceBetween,
  FormField,
  InputField,
  FormikForm,
  FormikSubmit,
  SubmitButton,
  StyledForm,
} from "@wedding-planner/shared";
import { APIFetcher } from "utils";
import { LoginVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/LoginVendorAccount.request";
import { RouteHelper } from "utils/RouteHelper";
import { Link } from "react-router-dom";
import { values } from "lodash";
import { VENDOR_SIGN_UP_SCHEMA } from "@wedding-planner/shared/common/schemas/VENDOR_SIGN_UP_SCHEMA";

enum Field {
  EMAIL = "email",
  PASSWORD = "password",
  PASSWORD_CONFIRM = "passwordConfirm",
  FULL_NAME = "fullName",
  PHONE_NUMBER = "phoneNumber",
  BUSINESS_NAME = "businessName",
}

type Values = Record<Field, string>;

const initialValues = values(Field).reduce((acc, curr) => {
  acc[curr] = "";
  return acc;
}, {} as Values);

export type VendorSignupFormProps = {};

export const VendorSignupForm = (props: VendorSignupFormProps) => {
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    setErrMsg(null);

    return APIFetcher.registerVendorAccount(values).catch(
      (err: LoginVendorAccountRequest.ErrorResponse) => {
        setErrMsg(err.msg);
      }
    );
  };

  return (
    <FormikForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={VENDOR_SIGN_UP_SCHEMA}
    >
      <StyledForm
        errorMsg={errMsg}
        formActions={
          <SubmitButton loadingText="Creating account">
            Create account
          </SubmitButton>
        }
        footer={
          <SpaceBetween justify="center">
            <p>
              Already have an account?{" "}
              <Link to={RouteHelper.VendorLogin()}>Login!</Link>
            </p>
          </SpaceBetween>
        }
      >
        <SpaceBetween vertical stretchChildren>
          <h1>Vendor sign up</h1>

          <FormField name={Field.FULL_NAME} label="Full name">
            <InputField />
          </FormField>

          <FormField name={Field.EMAIL} label="Email">
            <InputField autoComplete={false} />
          </FormField>

          <FormField name={Field.PHONE_NUMBER} label="Phone number">
            <InputField placeholder="(012) 345-6789" />
          </FormField>

          <FormField name={Field.BUSINESS_NAME} label="Business name">
            <InputField />
          </FormField>

          <FormField name={Field.PASSWORD} label="Password">
            <InputField type="password" />
          </FormField>

          <FormField name={Field.PASSWORD_CONFIRM} label="Confirm password">
            <InputField type="password" />
          </FormField>
        </SpaceBetween>
      </StyledForm>
    </FormikForm>
  );
};
