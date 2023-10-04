import { Vendor } from "@wedding-planner/shared/common/types";

const mediaAssets: Vendor.MediaAsset[] = [
  {
    type: "image",
    url: "https://iso.500px.com/wp-content/uploads/2020/07/Her-By-Melli-Shayne-.jpeg",
  },
  {
    type: "image",
    url: "https://iso.500px.com/wp-content/uploads/2020/07/Her-By-Melli-Shayne-.jpeg",
  },
  {
    type: "image",
    url: "https://iso.500px.com/wp-content/uploads/2020/07/Her-By-Melli-Shayne-.jpeg",
  },
];

export const mockPhotographer: Vendor.Vendor = {
  name: "Some Photographer",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  city: "Seattle, WA",
  thumbnail: "https://placehold.co/1920x1080",
  media: mediaAssets,
};
