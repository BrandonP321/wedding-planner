import { DeepOmitKey, KeyOf } from "../../../common";
import { DefaultModel, Vendor } from "../../../common/types";
import { LinkModel } from "../Link";
import { MainChoiceModel } from "../mainChoice";
import { VendorImageAssetModel } from "../vendorImageAsset";

export namespace VendorModel {
  export const Name = "vendor";
  export const PopulatedName = "vendorListing";

  export type Base = {
    name: string;
    description: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
    vendorType: Vendor.VendorType;
    /** ID of vendor account that owns this listing */
    ownerId: number;
    /** Distance in meters that the vendor is willing to travel */
    serviceableRadius: number;
    locationGeometry: {
      type: "Point";
      coordinates: [number, number];
      crs: { type: "name"; properties: { name: "EPSG:4326" } };
    };
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<
    Attributes,
    | "city"
    | "state"
    | "streetAddress"
    | "zipCode"
    | "id"
    | "lat"
    | "lng"
    | "description"
    | "name"
    | "ownerId"
    | "serviceableRadius"
    | "vendorType"
  >;

  export type PopulatedCreationAttributes = {
    [LinkModel.PopulatedName]: LinkModel.CreationParams[];
    [LinkModel.SocialLinksPopulatedName]: LinkModel.CreationParams[];
  };

  export type PopulatedResponseAttributes = {
    [MainChoiceModel.PopulatedName]: MainChoiceModel.Response.Populated[];
    [VendorImageAssetModel.PopulatedName]: VendorImageAssetModel.Response[];
    [VendorImageAssetModel.ShowcasePopulatedName]: VendorImageAssetModel.Response[];
    [LinkModel.PopulatedName]: LinkModel.Response[];
    [LinkModel.SocialLinksPopulatedName]: LinkModel.Response[];
  };

  export type CreationParams = DeepOmitKey<
    Base,
    "locationGeometry" | "ownerId"
  > &
    PopulatedCreationAttributes;
  export type UpdateParams = CreationParams;

  export type ResponseAttributes = Pick<Attributes, IncludedAttributes>;

  export namespace APIResponse {
    export type Unpopulated = ResponseAttributes;

    export type Populated = ResponseAttributes & PopulatedResponseAttributes;
  }
}
