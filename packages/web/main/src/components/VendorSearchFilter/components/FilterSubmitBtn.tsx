import { SubmitButton } from "@wedding-planner/shared/web/components/Button/SubmitButton/SubmitButton";
import styles from "../VendorSearchFilter.module.scss";

export const FilterSubmitBtn = () => (
  <SubmitButton classes={{ root: styles.saveBtn }}>Apply filters</SubmitButton>
);
