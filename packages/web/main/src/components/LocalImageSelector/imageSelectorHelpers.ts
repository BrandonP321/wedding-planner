import { VendorImageAssetModel } from "@wedding-planner/shared/api/models/vendorImageAsset/vendorImageAsset.model";
import { ImageUtils } from "@wedding-planner/shared/web/utils";
import axios from "axios";
import { Crop } from "react-image-crop";
import { APIFetcher, ImageCompressionUtils } from "utils";

export type ImageForUpload = File & {
  original: string;
  preview: string;
  crop?: Crop;
  final?: File;
  showcaseOrder?: number;
  isInShowcase?: boolean;
};

const imageToFile = async (url: string, filename: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  const file = new File([data], filename, { type: "image/jpeg" });

  return file;
};

export const getFileObjectsFromImages = async (
  images: VendorImageAssetModel.Response[]
) => {
  return await Promise.all(
    images.map(async (img): Promise<ImageForUpload> => {
      const imageUrl = ImageUtils.getImageUrl({
        bucket: img.s3Bucket,
        key: img.s3ObjectKey,
      });

      const file = (await imageToFile(imageUrl, img.name)) as ImageForUpload;

      file.original = URL.createObjectURL(file);
      file.preview = URL.createObjectURL(file);
      file.isInShowcase = img.isShowcaseImage;
      file.showcaseOrder = img.showcaseOrder ?? undefined;

      return file;
    })
  );
};

export const getSortedShowcaseImages = (images: ImageForUpload[]) =>
  images
    .filter((i) => i.isInShowcase)
    .sort((a, b) => (a.showcaseOrder ?? 0) - (b.showcaseOrder ?? 0));

export const uploadImages = async (files: ImageForUpload[]) => {
  // Comrpess images
  const images = await ImageCompressionUtils.compressImages(
    // TODO: Ensure all images have been cropped to 1920x1080 before reaching this point
    files.map((f) => f.final ?? f)
  );

  // Get unique S3 signed URLs for each image
  const { signedURLs } = await APIFetcher.getVendorImageUploadPresignedUrl({
    imageNames: images.map((img) => img.name),
  });

  // Upload all images to S3
  await Promise.all(
    signedURLs.map(async ({ signedUrl }, i) => {
      const image = images[i];

      await axios.put(signedUrl, image, {
        headers: {
          "Content-Type": image.type,
        },
      });
    })
  );

  await APIFetcher.associateVendorTempAssets({
    assets: signedURLs.map(({ objectKey }, i) => {
      const image = files[i];

      return {
        isInShowcase: !!image.isInShowcase,
        showcaseOrder: image.showcaseOrder ?? null,
        objectKey,
      };
    }),
  });
};
