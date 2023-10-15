import { SocialMediaPlatform } from "../enums";

export namespace VendorTypes {
  export type SocialMediaLink = {
    type: SocialMediaPlatform;
    url: string;
  };
}
