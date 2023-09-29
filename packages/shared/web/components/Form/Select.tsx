import { useFormFieldContext } from "../Form/FormField";
import { useFormikContext } from "formik";
import { MapOfStrings } from "../../../common/utils";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";

export type SelectOption<V extends string> = DropdownOption<V>;

export type SelectProps<Value> = {
  options: DropdownOption<Value>[];
};

export const Select = <V extends string>({ options }: SelectProps<V>) => {
  const { name } = useFormFieldContext();
  const { setFieldValue } = useFormikContext<MapOfStrings>();

  return (
    <Dropdown
      options={options}
      onOptionClick={(o) => setFieldValue(name, o.value)}
    />
  );
};
