import { KeyOf } from "../../../common";
import { DefaultModel, VendorChoiceFilterType } from "../../../common/types";

export namespace ChoiceModel {
  export const Name = "choice";
  export const PopulatedName = "choices";

  export type Base = {
    name: string;
    choiceGroupId: number;
    /**
     * Typically the same as the `price`, but can
     * have a different value used for filtering
     */
    value: number;
    price: number;
    filterType: VendorChoiceFilterType;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<
    Attributes,
    "id" | "name" | "value" | "price" | "filterType"
  >;

  export type CreationParams = Pick<
    Attributes,
    Exclude<IncludedAttributes, "id">
  >;

  export type Response = Pick<Attributes, IncludedAttributes>;
}
