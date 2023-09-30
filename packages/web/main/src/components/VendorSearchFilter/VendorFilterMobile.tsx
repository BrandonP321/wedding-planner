import { SpaceBetween, Modal } from "@wedding-planner/shared";
import { useState } from "react";
import { VendorSearchFilterContent } from "./VendorSearchFilter";
import { FilterSubmitBtn } from "./components/FilterSubmitBtn";
import {
  VendorFilterFormikProps,
  VendorFilterFormik,
} from "./components/VendorFilterFormik";
import styles from "./VendorSearchFilter.module.scss";

export type VendorSearchFilterMobileBarProps = VendorFilterFormikProps & {};

export const VendorSearchFilterMobile = ({
  handleSubmit,
}: VendorSearchFilterMobileBarProps) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <VendorFilterFormik
      handleSubmit={async (...params) => {
        setShowFilterModal(false);
        await handleSubmit(...params);
      }}
    >
      <>
        <SpaceBetween classes={{ root: styles.mobileFilterBar }}>
          <button onClick={() => setShowFilterModal(!showFilterModal)}>
            Filters
          </button>
        </SpaceBetween>
        <Modal
          title="Filters"
          show={showFilterModal}
          toggleShow={() => setShowFilterModal(!showFilterModal)}
          footer={<FilterSubmitBtn />}
        >
          <VendorSearchFilterContent />
        </Modal>
      </>
    </VendorFilterFormik>
  );
};
