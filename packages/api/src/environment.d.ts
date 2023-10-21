import { Stage } from "@wedding-planner/shared/common/types/environment";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STAGE?: Stage;
      PORT?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_HOST?: string;
      GOOGLE_API_KEY?: string;
      S3_ACCESS_KEY_ID?: string;
      S3_SECRET_ACCESS_KEY?: string;
      VENDOR_ASSETS_S3_BUCKET?: string;
    }
  }
}

export {};
