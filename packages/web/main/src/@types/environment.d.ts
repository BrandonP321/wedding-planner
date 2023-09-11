import { WebMainProcessEnv } from "@wedding-planner/shared/web/types/webMainEnv";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends WebMainProcessEnv {}
  }
}
