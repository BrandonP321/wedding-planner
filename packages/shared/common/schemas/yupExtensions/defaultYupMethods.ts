import { addMethod, StringSchema, Maybe, Flags } from "yup";

type TStringSchema = StringSchema<Maybe<string>, unknown, unknown, Flags>;

export function addYupDefaultMethods() {
  addMethod(
    StringSchema,
    "optionallyRequired",
    function (required: boolean, msg: string) {
      let schema: TStringSchema = this;

      if (required) {
        schema = schema.required(msg);
      }

      return schema;
    }
  );
}
