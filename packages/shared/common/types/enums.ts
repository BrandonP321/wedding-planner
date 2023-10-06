export enum SocialMedia {
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  PINTEREST = "pinterest",
  TIKTOK = "tiktok",
}

export type SocialMediaMap<T> = Record<SocialMedia, T>;
