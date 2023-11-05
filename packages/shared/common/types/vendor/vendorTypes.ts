import { VendorModel } from "../../../api/models/vendor";
import { TypedOmit } from "../../utils";
import { SocialMediaPlatform } from "../enums";

export namespace VendorTypes {
  export type SocialMediaLink = {
    type: SocialMediaPlatform;
    url: string;
  };

  // export type BasicVendorData = TypedOmit<
  //   VendorModel.Base,
  //   "locationGeometry"
  // > &
  //   Pick<VendorModel.PopulatedAttributes, "links" | "socialLinks"> & {};
}

// const test: VendorTypes.BasicVendorData = {};
