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
  public static assetsBucket = process.env.VENDOR_ASSETS_S3_BUCKET ?? "";

  public static getS3PresignedUrlForUpload = async ({
    Bucket,
    Key,
    expiresIn = 60 * 5,
  }: PresignedUrlParams) => {
    const command = new PutObjectCommand({ Bucket, Key });

    return await getSignedUrl(s3, command, { expiresIn });
  };

  /**
   * Returns a signed URL for uploading an asset to S3.  Object key gets a
   * 'temp/' prefix and needs to be copied to final location after upload.
   */
  public static getS3PresignedUrlForAssetUpload = async (params: {
    fileName: string;
    entityType: "vendor";
    entityId: number;
    assetType: "image" | "video";
  }) => {
    const { assetType, entityId, entityType, fileName } = params;

    const randomHash = crypto.randomBytes(16).toString("hex");
    const objectKey = `temp/${entityType}/${entityId}/${assetType}/${randomHash}/${encodeURIComponent(
      fileName
    )}`;

    const signedUrl = await this.getS3PresignedUrlForUpload({
      Bucket: this.assetsBucket,
      Key: objectKey,
    });

    return { signedUrl, objectKey };
  };

  public static removeObjectKeyTempPrefix = (key: string) => {
    return key.replace("temp/", "");
  };
}
