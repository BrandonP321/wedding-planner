import { VendorModel } from "../../../api/models/vendor";
import { DeepOmitKey, DeepOptionalKey } from "../../utils";
import { SocialMediaPlatform } from "../enums";
import { DefaultModel } from "../model.types";
import { Asset } from "./asset";

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
  export type VendorWithOptionalIDs = DeepOptionalKey<Vendor, "id">;
  export type VendorWithoutIDs = DeepOmitKey<Vendor, "id">;

  export enum VendorType {
    PHOTOGRAPHER = "photographer",
    CATERER = "caterer",
  }

  export type VendorTypeMap<T> = Record<VendorType, T>;
}
