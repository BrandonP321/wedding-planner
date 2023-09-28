import { Scrollable } from "@wedding-planner/shared";
import { FilterSubmitBtn } from "./components/FilterSubmitBtn";
import {
  VendorFilterFormikProps,
  VendorFilterFormik,
} from "./components/VendorFilterFormik";
import styles from "./VendorSearchFilter.module.scss";
import { VendorSearchFilterContent } from "./VendorSearchFilter";

export type VendorSearchFilterSideBarProps = VendorFilterFormikProps & {};

export const VendorSearchFilterSideBar = (
  props: VendorSearchFilterSideBarProps
) => {
  return (
    <VendorFilterFormik {...props}>
      <Scrollable
        classes={{
          root: styles.sidebar,
          content: styles.sidebarContent,
          footer: styles.sidebarFooter,
        }}
        footer={<FilterSubmitBtn />}
      >
        <VendorSearchFilterContent />
      </Scrollable>
    </VendorFilterFormik>
  );
};
