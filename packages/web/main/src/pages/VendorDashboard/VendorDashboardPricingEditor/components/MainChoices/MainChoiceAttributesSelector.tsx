import {
  CheckboxField,
  CheckboxFormField,
  SpaceBetween,
} from "@wedding-planner/shared";
import {
  PricingEditorContextProps,
  usePricingEditorContext,
} from "../../PricingHelpers";
import { vendorMainChoiceAttributesMap } from "@wedding-planner/shared/common/vendors/vendorAttributes";

// TODO: Replace with real data
// const tempAttributes = [
//   {
//     groupLabel: "Photography style",
//     attributes: [
//       {
//         label: "Traditional",
//         value: "traditional",
//       },
//       {
//         label: "Photojournalistic",
//         value: "photojournalistic",
//       },
//       {
//         label: "Artistic",
//         value: "artistic",
//       },
//       {
//         label: "Editorial",
//         value: "editorial",
//       },
//     ],
//   },
//   {
//     groupLabel: "Other",
//     attributes: [
//       {
//         label: "Videography",
//         value: "videography",
//       },
//       {
//         label: "Drone footage",
//         value: "drone-footage",
//       },
//       {
//         label: "Wedding album",
//         value: "wedding-album",
//       },
//     ],
//   },
// ];

const tempVendorType = "photographer";

type Props = Required<Pick<PricingEditorContextProps, "mainChoiceIndex">>;

export const MainChoiceAttributesSelector = (props: Props) => {
  const { updateMainChoice, mainChoice } = usePricingEditorContext(props);

  const mainChoiceAttributes = vendorMainChoiceAttributesMap[tempVendorType];

  const handleChange = (v: string, isChecked: boolean) => {
    // If not currently checked, add it to list of attributes
    if (!isChecked) {
      updateMainChoice((mc) => {
        mc.attributes.push({
          filterName: v as any,
        });
      });
    } else {
      // Otherwise, remove it from the list of attributes
      updateMainChoice((mc) => {
        mc.attributes = mc.attributes.filter((a) => a.filterName !== v);
      });
    }
  };

  return (
    <SpaceBetween size="m" vertical>
      {mainChoiceAttributes.map((group, i) => (
        <SpaceBetween key={i} size="xs" vertical stretch>
          <h5>
            <strong>{group.groupName}</strong>
          </h5>
          <CheckboxFormField>
            {group.attributes.map((a, j) => {
              const isChecked = mainChoice?.attributes?.some(
                (att) => att.filterName === a.value
              );

              return (
                <CheckboxField
                  key={j}
                  label={a.label}
                  value={a.value}
                  onChange={(v) => handleChange(v, !!isChecked)}
                  checked={isChecked}
                />
              );
            })}
          </CheckboxFormField>
        </SpaceBetween>
      ))}
    </SpaceBetween>
  );
};
