import React from "react";
import { Button, ButtonProps } from "../Button";
import { useFormikContext } from "formik";

export const SubmitButton = ({
  type,
  variant = "primary",
  children = "Submit",
  disabled = false,
  loading,
  ...props
}: ButtonProps) => {
  const { dirty, isSubmitting } = useFormikContext();

  return (
    <Button
      {...props}
      type="submit"
      variant={variant}
      loading={!!loading || isSubmitting}
      disabled={disabled || !dirty}
    >
      {children}
    </Button>
  );
};
