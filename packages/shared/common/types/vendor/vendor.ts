export namespace Vendor {
  export type MediaAsset =
    | {
        type: "image";
        url: string;
      }
    | {
        type: "video";
        url: string;
        posterImg: string;
      };

  export type Vendor = {
    name: string;
    description: string;
    media: MediaAsset[];
    city: string;
    thumbnail: string;
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
