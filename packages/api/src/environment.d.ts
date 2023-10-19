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
    }
  }
}

export {};
