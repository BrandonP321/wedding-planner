import { useFormFieldContext } from "../Form/FormField";
import { useFormikContext } from "formik";
import { MapOfStrings } from "../../../common/utils";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { useMemo } from "react";

export type SelectOption<V extends string> = DropdownOption<V>;

export type SelectProps<Value> = {
  placeholder?: string;
  options: DropdownOption<Value>[];
};

export const Select = <V extends string>({
  options,
  placeholder,
}: SelectProps<V>) => {
  const { name } = useFormFieldContext();
  const { setFieldValue, values } = useFormikContext<MapOfStrings>();

  const selected = useMemo(
    () => name && options.find((o) => o.value === values[name]),
    [name, options, values]
  );

  return (
    <Dropdown
      options={options}
      placeholder={placeholder}
      selected={selected || undefined}
      onOptionClick={(o) => name && setFieldValue(name, o.value)}
    />
  );
};
