import { string, object, ObjectSchema } from "yup";
import { SchemaUtils } from "../utils/SchemaUtils";
import { LoginVendorAccountRequest } from "../../api/requests/auth/LoginVendorAccount.request";
import { addCustomYupMethods } from "./yupExtensions";

addCustomYupMethods();

type ValidationInput = LoginVendorAccountRequest.ReqBody;

export const VENDOR_LOGIN_SCHEMA: ObjectSchema<ValidationInput> =
  object().shape({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  });

export const validateVendorLoginSchema =
  SchemaUtils.getValidationFunc<ValidationInput>(VENDOR_LOGIN_SCHEMA);
