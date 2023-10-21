import { Region } from "@wedding-planner/shared/common/types";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: Region.US_EAST_1,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
});
