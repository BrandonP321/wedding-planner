import React, { createContext, useState } from "react";

type CustomFormContextProps = {
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
};

export const CustomFormContext = createContext<CustomFormContextProps>(
  {} as CustomFormContextProps
);

type Props = React.PropsWithChildren<{
  isEditableDefaultValue?: boolean;
}>;

export const CustomFormProvider = ({
  isEditableDefaultValue = true,
  children,
}: Props) => {
  const [isEditable, setIsEditable] = useState(isEditableDefaultValue);

  return (
    <CustomFormContext.Provider value={{ isEditable, setIsEditable }}>
      {children}
    </CustomFormContext.Provider>
  );
};
