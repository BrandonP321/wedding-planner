import { addMethod, StringSchema } from "yup";
import { RegexUtils } from "../../utils";

export function addYupAccountMethods() {
  addMethod(StringSchema, "customEmail", function (required: boolean) {
    return this.email("Email format is invalid").optionallyRequired(
      required,
      "Email is required"
    );
  });

  addMethod(StringSchema, "businessName", function (required: boolean) {
    return this.max(100, "Business name is too long").optionallyRequired(
      required,
      "Business name is required"
    );
  });

  addMethod(StringSchema, "fullName", function (required: boolean) {
    return this.max(100, "Full name is too long").optionallyRequired(
      required,
      "Full name is required"
    );
  });

  addMethod(StringSchema, "phoneNumber", function (required: boolean) {
    return this.matches(
      RegexUtils.phoneRegex,
      "Phone number must be 10 digits"
    ).optionallyRequired(required, "Phone number is required");
  });
}
