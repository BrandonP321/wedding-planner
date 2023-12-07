import React, { useState } from "react";
import {
  SpaceBetween,
  FormField,
  InputField,
  FormikForm,
  FormikSubmit,
  SubmitButton,
  StyledForm,
  UrlUtils,
} from "@wedding-planner/shared";
import { APIFetcher } from "utils";
import { LoginVendorAccountRequest } from "@wedding-planner/shared/api/requests/auth/LoginVendorAccount.request";
import { RouteHelper } from "utils/RouteHelper";
import { Link, useNavigate } from "react-router-dom";

enum Field {
  EMAIL = "email",
  PASSWORD = "password",
}

type Values = Record<Field, string>;

export type VendorLoginFormProps = {};

export const VendorLoginForm = (props: VendorLoginFormProps) => {
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    setErrMsg(null);

    const redirectTo = UrlUtils.getParam(
      RouteHelper.SearchParamKeys.RedirectTo
    );

    return APIFetcher.loginVendorAccount(values)
      .then(() => {
        navigate(redirectTo ?? RouteHelper.VendorDashboard.Listing(), {
          replace: !!redirectTo,
        });
      })
      .catch((err: LoginVendorAccountRequest.ErrorResponse) => {
        setErrMsg(err.msg);
      });
  };

  return (
    <FormikForm
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <StyledForm
        errorMsg={errMsg}
        formActions={<SubmitButton>Login</SubmitButton>}
        footer={
          <SpaceBetween justify="center">
            <p>
              Don't have an account?{" "}
              <Link to={RouteHelper.VendorSignup()}>Sign up!</Link>
            </p>
          </SpaceBetween>
        }
      >
        <SpaceBetween vertical stretchChildren>
          <h1>Vendor login</h1>

          <FormField name={Field.EMAIL} label="Email">
            <InputField />
          </FormField>

          <FormField name={Field.PASSWORD} label="Password">
            <InputField type="password" />
          </FormField>
        </SpaceBetween>
      </StyledForm>
    </FormikForm>
  );
};
