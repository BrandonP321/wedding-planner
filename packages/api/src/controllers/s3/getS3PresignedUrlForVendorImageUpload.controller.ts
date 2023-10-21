import { Controller, S3Utils } from "../../utils";
import { GetS3PresignedUrlForVendorImageUploadRequest } from "@wedding-planner/shared/api/requests/s3/getS3PresignedUrlForVendorImageUpload.request";

const controller = new Controller<
  GetS3PresignedUrlForVendorImageUploadRequest.ReqBody,
  GetS3PresignedUrlForVendorImageUploadRequest.ResBody,
  {},
  typeof GetS3PresignedUrlForVendorImageUploadRequest.Errors
>(GetS3PresignedUrlForVendorImageUploadRequest.Errors);

export const GetS3PresignedUrlForVendorImageUploadController =
  controller.handler(async (req, res, errors) => {
    const { imageNames } = req.body;

    const tempUserId = 12345;

    const signedURLs = await Promise.all(
      imageNames.map(async (imageName) => {
        return await S3Utils.getS3PresignedUrlForAssetUpload({
          assetType: "image",
          entityId: tempUserId,
          entityType: "vendor",
          fileName: imageName,
        });
      })
    );

    return res.json({ signedURLs }).end();
  });
