import { addMethod, StringSchema, ref } from "yup";

const containsLowerCaseRegex = /(?=.*[a-z])/;
const containsUpperCaseRegex = /(?=.*[A-Z])/;
const containsNumberRegex = /(?=.*[0-9])/;

const maxLength = 100;
const minLength = 8;

export function addYupPasswordMethods() {
  addMethod(StringSchema, "password", function () {
    return this.min(
      minLength,
      `Password must be at least ${minLength} characters`
    )
      .max(maxLength, `Password must be at most ${maxLength} characters`)
      .matches(
        containsLowerCaseRegex,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        containsUpperCaseRegex,
        "Password must contain at least one uppercase letter"
      )
      .matches(containsNumberRegex, "Password must contain at least one number")
      .required("Password is required");
  });

  addMethod(StringSchema, "passwordConfirm", function (path: string) {
    return this.oneOf([ref(path)], "Passwords must match").required("Required");
  });
}
