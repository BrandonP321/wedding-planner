import { KeyOf } from "../../../common";
import { DefaultModel } from "../../../common/types";

export namespace VendorImageAssetModel {
  export const Name = "vendorImageAsset";
  export const PopulatedName = "images";
  export const ShowcasePopulatedName = "showcaseImages";

  export type Base = {
    name: string;
    s3ObjectKey: string;
    s3Bucket: string;
    order: number;
    isShowcaseImage: boolean;
    showcaseOrder: number | null;
    vendorId: number;
    isLive: boolean;
  };

  export type CreationOrUpdateParams = Base & { id?: number };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<
    Attributes,
    | "id"
    | "s3Bucket"
    | "s3ObjectKey"
    | "order"
    | "name"
    | "isShowcaseImage"
    | "showcaseOrder"
  >;

  export type ShowcaseIncludedAttributes = KeyOf<
    Attributes,
    "id" | "s3Bucket" | "s3ObjectKey" | "showcaseOrder" | "name"
  >;

  export type Response = Pick<Attributes, IncludedAttributes>;
}
