export namespace Asset {
  export type ImageAsset = {
    url: string;
  };

  export type VideoAsset = {
    url: string;
    posterImg: string;
  };

  export enum AssetType {
    IMAGE = "image",
    VIDEO = "video",
  }

  export type MediaAsset =
    | ({
        type: AssetType.IMAGE;
      } & ImageAsset)
    | ({
        type: AssetType.VIDEO;
      } & VideoAsset);
}
