import { KeyOf } from "../../../common";
import {
  DefaultModel,
  VendorChoiceGroupFilterType,
} from "../../../common/types";
import { ChoiceModel } from "../choice/choice.model";

export namespace ChoiceGroupModel {
  export const Name = "choiceGroup";
  export const PopulatedName = "choiceGroups";

  export type Base = {
    name: string;
    type: VendorChoiceGroupFilterType;
    mainChoiceId: number;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<Attributes, "id" | "name" | "type">;

  export type PopulatedAttributes = {
    [ChoiceModel.PopulatedName]: ChoiceModel.Response[];
  };

  export namespace Response {
    export type Unpopulated = Pick<Attributes, IncludedAttributes>;

    export type Populated = Pick<Attributes, IncludedAttributes> &
      PopulatedAttributes;
  }
}