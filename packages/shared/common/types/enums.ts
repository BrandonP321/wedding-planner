export enum SocialMediaPlatform {
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  PINTEREST = "pinterest",
  TIKTOK = "tiktok",
}

export type SocialMediaPlatformMap<T> = Record<SocialMediaPlatform, T>;
