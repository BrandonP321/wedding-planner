import { DeepOptionalKey, KeyOf } from "../../../common";
import { DefaultModel } from "../../../common/types";
import { ChoiceGroupModel } from "../choiceGroup";
import { MainChoiceAttributeModel } from "../mainChoiceAttribute";

export namespace MainChoiceModel {
  export const Name = "mainChoice";
  export const PopulatedName = "mainChoices";

  export type Base = {
    name: string;
    vendorId: number;
    /** If false, main choice will not be presented to users */
    isLive: boolean;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<Attributes, "id" | "name">;

  export type PopulatedCreationAttributes = {
    [ChoiceGroupModel.PopulatedName]: ChoiceGroupModel.CreationParams[];
    [MainChoiceAttributeModel.PopulatedName]: MainChoiceAttributeModel.CreationParams[];
  };

  export type PopulatedResponseAttributes = {
    [ChoiceGroupModel.PopulatedName]: ChoiceGroupModel.Response.Populated[];
    [MainChoiceAttributeModel.PopulatedName]: MainChoiceAttributeModel.Response[];
  };

  export type CreationParams = Pick<
    Attributes,
    Exclude<IncludedAttributes, "id">
  > &
    PopulatedCreationAttributes;

  type ResponseAttributes = Pick<Attributes, IncludedAttributes>;

  export namespace Response {
    export type Unpopulated = ResponseAttributes;

    export type Populated = ResponseAttributes & PopulatedResponseAttributes;
  }
}
