import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../services/aws/s3";
import crypto from "crypto";

type PresignedUrlParams = {
  Bucket: string;
  Key: string;
  expiresIn?: number;
};

export class S3Utils {
  public static getS3PresignedUrlForUpload = async ({
    Bucket,
    Key,
    expiresIn = 60 * 5,
  }: PresignedUrlParams) => {
    const command = new PutObjectCommand({ Bucket, Key });

    return await getSignedUrl(s3, command, { expiresIn });
  };

  public static getS3PresignedUrlForAssetUpload = async (params: {
    fileName: string;
    entityType: "vendor";
    entityId: number;
    assetType: "image" | "video";
  }) => {
    const { assetType, entityId, entityType, fileName } = params;

    const randomHash = crypto.randomBytes(16).toString("hex");
    const objectKey = `${entityType}/${entityId}/${assetType}/${randomHash}/${encodeURIComponent(
      fileName
    )}`;

    const signedUrl = await this.getS3PresignedUrlForUpload({
      Bucket: process.env.VENDOR_ASSETS_S3_BUCKET ?? "",
      Key: objectKey,
    });

    return { signedUrl, objectKey };
  };
}
