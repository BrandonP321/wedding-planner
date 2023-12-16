import { object, ObjectSchema, string } from "yup";
import { SchemaUtils } from "../utils/SchemaUtils";
import { RegisterVendorAccountRequest } from "../../api/requests/auth/RegisterVendorAccount.request";
import { addCustomYupMethods } from "./yupExtensions";

addCustomYupMethods();

type ValidationInput = RegisterVendorAccountRequest.ReqBody;

export const VENDOR_SIGN_UP_SCHEMA: ObjectSchema<Partial<ValidationInput>> =
  object().shape({
    email: string().customEmail(true),
    businessName: string().businessName(true),
    fullName: string().fullName(true),
    phoneNumber: string().phoneNumber(true),
    password: string().password(),
    passwordConfirm: string().passwordConfirm("password"),
  });

export const validateVENDOR_SIGN_UP_SCHEMA =
  SchemaUtils.getValidationFunc<ValidationInput>(VENDOR_SIGN_UP_SCHEMA);
