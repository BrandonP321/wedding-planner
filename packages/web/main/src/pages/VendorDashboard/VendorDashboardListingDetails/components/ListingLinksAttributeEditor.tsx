import { useFormikContext } from "formik";
import {
  LinkValue,
  LinksFieldName,
  Values,
} from "../VendorDashboardListingDetails";
import {
  AttributeEditor,
  AttributeEditorDefinition,
  AttributeEditorInput,
} from "@wedding-planner/shared/web/components";

const linksEditorDefinition: AttributeEditorDefinition<LinkValue>[] = [
  {
    label: "Link label",
    control: ({ index }) => (
      <AttributeEditorInput
        index={index}
        placeholder="Label"
        fieldName={LinksFieldName}
        updateValue={(v, current: LinkValue) => ({ ...current, name: v })}
        getValue={(v) => v?.name ?? ""}
      />
    ),
  },
  {
    label: "URL",
    control: ({ index }) => (
      <AttributeEditorInput
        index={index}
        placeholder="Link URL"
        fieldName={LinksFieldName}
        updateValue={(v, current: LinkValue) => ({ ...current, url: v })}
        getValue={(v) => v?.url ?? ""}
      />
    ),
  },
];

export const ListingLinksEditor = () => {
  const { values, setValues } = useFormikContext<Values>();

  const addRow = () =>
    setValues({
      ...values,
      links: [...values[LinksFieldName], { name: "", url: "" }],
    });

  const removeRow = (index: number) => {
    const newLinks = [...values[LinksFieldName]];
    newLinks.splice(index, 1);

    setValues({
      ...values,
      links: newLinks,
    });
  };

  return (
    <AttributeEditor
      maxRows={10}
      definition={linksEditorDefinition}
      items={values[LinksFieldName]}
      addButtonText="Add link"
      onAddButtonClick={addRow}
      onRemoveButtonClick={removeRow}
    />
  );
};
