import { DeepOptionalKey, KeyOf } from "../../../common";
import { DefaultModel, SocialMediaPlatform } from "../../../common/types";

type LinkType = SocialMediaPlatform;

export namespace LinkModel {
  export const Name = "link";
  export const PopulatedName = "links";
  export const SocialLinksPopulatedName = "socialLinks";

  export type Base = {
    label: string;
    type: LinkType | "custom";
    url: string;
    ownerId: number;
    vendorId: number;
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<
    Attributes,
    "id" | "label" | "type" | "url" | "ownerId"
  >;

  export type CreationParams = Pick<
    Attributes,
    Exclude<IncludedAttributes, "id" | "ownerId">
  >;

  export type UpdateParams = DeepOptionalKey<
    Pick<Attributes, IncludedAttributes>,
    "id"
  >;

  export type Response = Pick<Attributes, IncludedAttributes>;
}
