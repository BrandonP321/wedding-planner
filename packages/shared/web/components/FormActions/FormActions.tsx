import { SpaceBetween, SpaceBetweenProps } from "../SpaceBetween/SpaceBetween";
import styles from "./FormActions.module.scss";

export type FormActionsProps = Partial<SpaceBetweenProps> & {};

export const FormActions = (props: FormActionsProps) => {
  return <SpaceBetween size="m" justify="end" {...props} />;
};
