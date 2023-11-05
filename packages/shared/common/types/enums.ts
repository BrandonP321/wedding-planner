import { EnumUtils } from "../utils";

export enum SocialMediaPlatform {
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  PINTEREST = "pinterest",
  TIKTOK = "tiktok",
}

export const SocialMediaPlatformsList =
  EnumUtils.toArrayOfValues(SocialMediaPlatform);

export type SocialMediaPlatformMap<T> = Record<SocialMediaPlatform, T>;
