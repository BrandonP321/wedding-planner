import React from "react";
import styles from "./VendorAuth.module.scss";
import { PageContent } from "@wedding-planner/shared";
import { VendorLoginForm } from "./components/VendorLoginForm";
import { VendorSignupForm } from "./components/VendorSignupForm";

export type VendorAuthProps = {
  authType?: "login" | "register";
};

export const VendorAuth = ({ authType = "login" }: VendorAuthProps) => {
  return (
    <div className={styles.page}>
      <PageContent horizontalPadding verticalPadding>
        {authType === "login" && <VendorLoginForm />}
        {authType === "register" && <VendorSignupForm />}
      </PageContent>
    </div>
  );
};
