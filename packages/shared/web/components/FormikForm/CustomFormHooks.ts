import { useContext } from "react";
import { CustomFormContext } from "./CustomFormProvider";

export function useCustomFormContext() {
  const customContext = useContext(CustomFormContext);

  return customContext;
}
