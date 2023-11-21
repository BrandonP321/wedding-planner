import { useFormikContext } from "formik";
import { PricingEditorValues } from "./VendorDashboardPricingEditor";

export type PricingEditorContextProps = {
  mainChoiceIndex?: number;
  choiceGroupIndex?: number;
  choiceIndex?: number;
};

export const usePricingEditorContext = (props: PricingEditorContextProps) => {
  const context = useFormikContext<PricingEditorValues>();

  const { values } = context;
  const { choiceGroupIndex, mainChoiceIndex, choiceIndex } = props;

  const mainChoice =
    mainChoiceIndex === undefined
      ? undefined
      : values.mainChoices[mainChoiceIndex];

  const choiceGroup =
    mainChoice && choiceGroupIndex !== undefined
      ? mainChoice.choiceGroups[choiceGroupIndex]
      : undefined;

  const choice =
    choiceGroup && choiceIndex !== undefined
      ? choiceGroup.choices[choiceIndex]
      : undefined;

  return { mainChoice, choiceGroup, choice, ...context };
};
