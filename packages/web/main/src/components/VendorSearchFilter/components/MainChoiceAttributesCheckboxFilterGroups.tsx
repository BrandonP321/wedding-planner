import {
  CheckboxField,
  CheckboxFormField,
} from "@wedding-planner/shared/web/components";

export type MainChoiceAttributesCheckboxFilterGroupProps = {
  title: string;
  name?: string;
  options: { label: string; value: string }[];
};

export const MainChoiceAttributesCheckboxFilterGroup = ({
  name = "mainChoiceAttributes",
  title,
  options,
}: MainChoiceAttributesCheckboxFilterGroupProps) => {
  return (
    <CheckboxFormField name={name} label={title}>
      {options.map((o, i) => (
        <CheckboxField key={i} label={o.label} value={o.value} />
      ))}
    </CheckboxFormField>
  );
};

export const MainChoiceSingleChoiceCheckboxFilterGroup = (
  props: MainChoiceAttributesCheckboxFilterGroupProps
) => (
  <MainChoiceAttributesCheckboxFilterGroup
    {...props}
    name="singleChoiceFilters"
  />
);
