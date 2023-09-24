import { Stage } from "../../common/types/environment";

export interface WebMainProcessEnv {
  REACT_APP_STAGE: string;
  REACT_APP_API_STAGE?: Stage;
}
