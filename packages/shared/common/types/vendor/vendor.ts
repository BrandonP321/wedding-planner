import { VendorModel } from "../../../api/models/vendor";
import { SocialMediaPlatform } from "../enums";
import { DefaultModel } from "../model.types";
import { Asset } from "./asset";

type OptionalId<T> = T extends { id: any }
  ? Omit<T, "id"> & { id?: T["id"] }
  : T;

type DeepOptionalId<T> = OptionalId<{
  [P in keyof T]: T[P] extends (infer U)[]
    ? DeepOptionalIdArray<U>[]
    : T[P] extends object
    ? DeepOptionalId<T[P]>
    : T[P];
}>;

type DeepOptionalIdArray<T> = T extends (infer U)[]
  ? DeepOptionalIdArray<U>[]
  : DeepOptionalId<T>;

export namespace Vendor {
  // export type SocialMediaLink = {
  //   type: SocialMedia;
  //   url: string;
  // };

  /** Populated vendor JSON after DB query */
  // export type VendorBase = VendorModelBase & {
  //   media: Asset.MediaAsset[];
  //   socialMediaLinks: SocialMediaLink[];
  // };
  export type Vendor = VendorModel.APIResponse.Populated;
  export type VendorWithOptionalIDs = DeepOptionalId<Vendor>;

  export enum VendorType {
    PHOTOGRAPHER = "photographer",
    CATERER = "caterer",
  }

  export type VendorTypeMap<T> = Record<VendorType, T>;
}
