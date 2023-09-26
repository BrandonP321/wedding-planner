export namespace Vendor {
  export type Vendor = {
    name: string;
    city: string;
    thumbnail: string;
  };

  /** Slim vendor JSON */
  export type SearchResult = Pick<Vendor, "city" | "name" | "thumbnail"> & {
    price: string;
  };

  export type VendorList = SearchResult[];
}
