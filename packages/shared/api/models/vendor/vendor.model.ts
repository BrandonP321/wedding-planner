import { KeyOf } from "../../../common";
import { DefaultModel } from "../../../common/types";
import { MainChoiceModel } from "../mainChoice";

export namespace VendorModel {
  export const Name = "vendor";

  export type Base = {
    name: string;
    description: string;
    city: string;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<
    Attributes,
    "city" | "id" | "description" | "name"
  >;

  export type PopulatedAttributes = {
    [MainChoiceModel.PopulatedName]: MainChoiceModel.Response.Populated[];
  };

  export type ResponseAttributes = Pick<Attributes, IncludedAttributes>;

  export namespace APIResponse {
    export type Unpopulated = ResponseAttributes;

    export type Populated = ResponseAttributes & PopulatedAttributes;
  }
}
