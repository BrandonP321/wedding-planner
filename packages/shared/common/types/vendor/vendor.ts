import { SocialMedia } from "../enums";

export namespace Vendor {
  export type ImageAsset = {
    url: string;
  };

  export type VideoAsset = {
    url: string;
    posterImg: string;
  };

  export type MediaAsset =
    | ({
        type: "image";
      } & ImageAsset)
    | ({
        type: "video";
      } & VideoAsset);

  export type SocialMediaLink = {
    type: SocialMedia;
    url: string;
  };

  export type Vendor = {
    name: string;
    description: string;
    media: MediaAsset[];
    city: string;
    thumbnail: string;
    socialMediaLinks: SocialMediaLink[];
  };

  /** Slim vendor JSON */
  export type SearchResult = Pick<Vendor, "city" | "name" | "thumbnail"> & {
    price: string;
  };

  export type VendorList = SearchResult[];

  export enum VendorType {
    PHOTOGRAPHER = "photographer",
    CATERER = "caterer",
  }

  export type VendorTypeMap<T> = Record<VendorType, T>;
}
