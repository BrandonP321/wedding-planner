import { useFormikContext } from "formik";
import {
  SocialLinkValue,
  Values,
  SocialsFieldName,
} from "../VendorDashboardListingDetails";
import {
  AttributeEditor,
  AttributeEditorDefinition,
  AttributeEditorDefinitionProps,
  AttributeEditorInput,
  AttributeEditorSelect,
  DropdownOption,
} from "@wedding-planner/shared/web/components";
import { SocialMediaPlatform } from "@wedding-planner/shared/common/types";

const options: DropdownOption<SocialMediaPlatform>[] = [
  { label: "Facebook", value: SocialMediaPlatform.FACEBOOK },
  { label: "Instagram", value: SocialMediaPlatform.INSTAGRAM },
  { label: "Pinterest", value: SocialMediaPlatform.PINTEREST },
  { label: "Twitter", value: SocialMediaPlatform.TWITTER },
  { label: "YouTube", value: SocialMediaPlatform.YOUTUBE },
  { label: "TikTok", value: SocialMediaPlatform.TIKTOK },
  { label: "LinkedIn", value: SocialMediaPlatform.LINKEDIN },
];

const SocialPlatformSelect = ({
  index,
  item,
}: AttributeEditorDefinitionProps<SocialLinkValue>) => {
  const { values } = useFormikContext<Values>();

  const selectedSocials = values[SocialsFieldName];

  return (
    <AttributeEditorSelect
      index={index}
      placeholder="Select platform"
      fieldName={SocialsFieldName}
      selectedOption={options.find((o) => o.value === item.platform)}
      options={options.filter((o) => {
        const selected = [...selectedSocials];
        selected.splice(index, 1);

        return !selected.some((s) => s.platform === o.value);
      })}
      updateValue={(option, prev) => ({ ...prev, platform: option.value })}
    />
  );
};

const definition: AttributeEditorDefinition<SocialLinkValue>[] = [
  {
    label: "Platform",
    control: (props) => <SocialPlatformSelect {...props} />,
  },
  {
    label: "URL",
    control: ({ index, item }) => {
      const selectedPlatform = options.find((o) => o.value === item.platform);
      const label = selectedPlatform?.label ?? "Link";

      return (
        <AttributeEditorInput
          index={index}
          placeholder={`${label} URL`}
          disabled={!item.platform}
          fieldName={SocialsFieldName}
          updateValue={(v, current: SocialLinkValue) => ({
            ...current,
            url: v,
          })}
          getValue={(v) => v?.url ?? ""}
        />
      );
    },
  },
];

export const ListingSocialsEditor = () => {
  const { values, setValues } = useFormikContext<Values>();

  const addRow = () =>
    setValues({
      ...values,
      socials: [...values[SocialsFieldName], { platform: undefined, url: "" }],
    });

  const removeRow = (index: number) => {
    const newSocials = [...values[SocialsFieldName]];
    newSocials.splice(index, 1);

    setValues({
      ...values,
      socials: newSocials,
    });
  };

  return (
    <AttributeEditor
      definition={definition}
      maxRows={Object.keys(SocialMediaPlatform).length}
      items={values[SocialsFieldName]}
      addButtonText="Add platform"
      onAddButtonClick={addRow}
      onRemoveButtonClick={removeRow}
    />
  );
};
