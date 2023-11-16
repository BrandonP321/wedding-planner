import React from "react";
import { Button, ButtonProps } from "../Button";
import { useFormikContext } from "formik";

export const SubmitButton = ({
  type,
  variant = "primary",
  children = "Submit",
  disabled,
  ...props
}: ButtonProps) => {
  const { dirty } = useFormikContext();

  return (
    <Button
      {...props}
      type="submit"
      variant={variant}
      disabled={disabled ?? !dirty}
    >
      {children}
    </Button>
  );
};
