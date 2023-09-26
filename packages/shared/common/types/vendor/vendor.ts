export namespace Vendor {
  export type Vendor = {
    name: string;
    city: string;
    thumbnail: string;
  };

  /** Slim vendor JSON */
  export type SlimVendor = Pick<Vendor, "city" | "name" | "thumbnail">;

  export type VendorList = SlimVendor[];
}
