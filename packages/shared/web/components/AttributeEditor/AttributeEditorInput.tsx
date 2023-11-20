import { useFormikContext } from "formik";
import { FormField, InputField } from "../Form";

type AttributeEditorInputProps<T, F> = {
  index: number;
  fieldName: T;
  updateValue: (v: string, f: F) => F;
  placeholder?: string;
  disabled?: boolean;
  getValue?: (f: F | undefined) => string;
};

export const AttributeEditorInput = <T extends string, F>({
  index,
  fieldName,
  placeholder,
  disabled,
  getValue,
  updateValue,
}: AttributeEditorInputProps<T, F>) => {
  const { setFieldValue, values } = useFormikContext<Record<T, F[]>>();

  const handleChange = (v: string) => {
    const newLinks = [...values[fieldName]];
    newLinks[index] = updateValue(v, newLinks[index]);

    setFieldValue(fieldName, newLinks);
  };

  const valueAtIndex = values?.[fieldName]?.[index];

  return (
    <FormField>
      <InputField
        onChange={(v) => handleChange(v)}
        placeholder={placeholder}
        disabled={disabled}
        value={getValue?.(valueAtIndex) ?? (valueAtIndex as string)}
      />
    </FormField>
  );
};
