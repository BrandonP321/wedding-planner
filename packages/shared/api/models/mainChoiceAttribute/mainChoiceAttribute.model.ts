import { KeyOf } from "../../../common";
import {
  DefaultModel,
  VendorMainChoiceFilterType,
} from "../../../common/types";

export namespace MainChoiceAttributeModel {
  export const Name = "mainChoiceAttribute";
  export const PopulatedName = "attributes";

  export type Base = {
    filterName: VendorMainChoiceFilterType;
    mainChoiceId: number;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<Attributes, "id" | "filterName">;

  export type CreationOrUpdateParams = Pick<Attributes, IncludedAttributes> & {
    id?: number;
  };

  export type Response = Pick<Attributes, IncludedAttributes>;
}
