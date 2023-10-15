import { VendorModel } from "../../../api/models/vendor";
import { SocialMediaPlatform } from "../enums";
import { DefaultModel } from "../model.types";
import { Asset } from "./asset";

export namespace Vendor {
  // export type SocialMediaLink = {
  //   type: SocialMedia;
  //   url: string;
  // };

  /** Vendor model types */
  // export type VendorModelBase = {
  //   name: string;
  //   description: string;
  //   city: string;
  // };

  /** Populated vendor JSON after DB query */
  // export type VendorBase = VendorModelBase & {
  //   media: Asset.MediaAsset[];
  //   socialMediaLinks: SocialMediaLink[];
  // };

  export type Vendor = VendorModel.Base & DefaultModel.Attributes;

  /** Slim vendor JSON */
  // export type SearchResult = Pick<Vendor, "city" | "name"> & {
  //   price: string;
  // };

  // export type VendorList = SearchResult[];

  export enum VendorType {
    PHOTOGRAPHER = "photographer",
    CATERER = "caterer",
  }

  export type VendorTypeMap<T> = Record<VendorType, T>;
}
