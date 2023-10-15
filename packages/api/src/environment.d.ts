import { Stage } from "@wedding-planner/shared/common/types/environment";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STAGE?: Stage;
      PORT?: number;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_HOST?: string;
    }
  }
}

export {};
