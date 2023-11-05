import { KeyOf } from "../../../common";
import { DefaultModel } from "../../../common/types";
import { LinkModel } from "../Link";
import { MainChoiceModel } from "../mainChoice";
import { VendorImageAssetModel } from "../vendorImageAsset";

export namespace VendorModel {
  export const Name = "vendor";

  export type Base = {
    name: string;
    description: string;
    city: string;
    locationGeometry: {
      type: "Point";
      coordinates: [number, number];
      crs: { type: "name"; properties: { name: "EPSG:4326" } };
    };
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<
    Attributes,
    "city" | "id" | "description" | "name"
  >;

  export type PopulatedCreationAttributes = {
    [LinkModel.PopulatedName]: LinkModel.CreationOrUpdateParams[];
    [LinkModel.SocialLinksPopulatedName]: LinkModel.CreationOrUpdateParams[];
  };

  export type PopulatedResponseAttributes = {
    [MainChoiceModel.PopulatedName]: MainChoiceModel.Response.Populated[];
    [VendorImageAssetModel.PopulatedName]: VendorImageAssetModel.Response[];
    [VendorImageAssetModel.ShowcasePopulatedName]: VendorImageAssetModel.Response[];
    [LinkModel.PopulatedName]: LinkModel.Response[];
    [LinkModel.SocialLinksPopulatedName]: LinkModel.Response[];
  };

  export type CreationOrUpdateAttributes = Base & PopulatedCreationAttributes;

  export type ResponseAttributes = Pick<Attributes, IncludedAttributes>;

  export namespace APIResponse {
    export type Unpopulated = ResponseAttributes;

    export type Populated = ResponseAttributes & PopulatedResponseAttributes;
  }
}
