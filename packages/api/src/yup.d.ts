declare module "yup" {
  interface StringSchema {
    password(): StringSchema;
    passwordConfirm(path: string): StringSchema;
    customEmail(required?: boolean): StringSchema;
    businessName(required?: boolean): StringSchema;
    fullName(required?: boolean): StringSchema;
    phoneNumber(required?: boolean): StringSchema;
    optionallyRequired(required: boolean, msg: string): StringSchema;
    myTest(): StringSchema;
  }
}

export {};
