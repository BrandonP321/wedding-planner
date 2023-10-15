import { KeyOf } from "../../../common";
import { DefaultModel } from "../../../common/types";
import { ChoiceGroupModel } from "../choiceGroup";
import { MainChoiceAttributeModel } from "../mainChoiceAttribute";

export namespace MainChoiceModel {
  export const Name = "mainChoice";
  export const PopulatedName = "mainChoices";

  export type Base = {
    name: string;
    vendorId: number;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<Attributes, "id" | "name">;

  export type PopulatedAttributes = {
    [ChoiceGroupModel.PopulatedName]: ChoiceGroupModel.Response.Populated[];
    [MainChoiceAttributeModel.PopulatedName]: MainChoiceAttributeModel.Response[];
  };

  type ResponseAttributes = Pick<Attributes, IncludedAttributes>;

  export namespace Response {
    export type Unpopulated = ResponseAttributes;

    export type Populated = ResponseAttributes & PopulatedAttributes;
  }
}
