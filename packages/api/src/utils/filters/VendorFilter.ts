import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import {
  VendorChoiceFilterType,
  VendorChoiceGroupFilterType,
  VendorFilterTypes,
} from "@wedding-planner/shared/common/types";

export namespace VendorFilter {
  export type ValidationFuncMainChoiceParam =
    MainChoiceModel.Response.Populated[];

  export type ValidationFuncResponse = MainChoiceModel.Response.Populated[];

  export type ValidationFunc = (
    mainChoices: ValidationFuncMainChoiceParam
  ) => ValidationFuncResponse;
}

export class VendorFilter {
  protected vendor: VendorModel.APIResponse.Populated;
  protected filters: VendorFilterTypes.Filters;

  constructor(
    vendor: VendorModel.APIResponse.Populated,
    filters: VendorFilterTypes.Filters
  ) {
    this.vendor = vendor;
    this.filters = filters;
  }

  /**
   * Considers a main choice valid if it has a choice group with a value
   * that is greater than or equal to the max value specified in the filters
   */
  protected choiceGroupMaxValueValidation = (
    mainChoices: VendorFilter.ValidationFuncMainChoiceParam,
    choiceGroupType: VendorChoiceGroupFilterType
  ): VendorFilter.ValidationFuncResponse => {
    const maxValue = this.filters.choiceGroupFilters?.[choiceGroupType];

    if (!maxValue) return mainChoices;

    const validMainChoices = mainChoices.filter((mc) => {
      const choiceGroup = mc.choiceGroups.find(
        (cg) => cg.filterType === choiceGroupType
      );

      // TODO: Consider different handling for edge cases where guest capacity is not defined
      if (!choiceGroup) return true;

      const isValidChoice = choiceGroup.choices.some((choice) => {
        return choice.value >= maxValue;
      });

      return isValidChoice;
    });

    return validMainChoices;
  };

  protected validateChoiceGroupMultiChoice = () => {};

  protected validateChoiceGroupSingleChoices = (
    mainChoices: VendorFilter.ValidationFuncMainChoiceParam
  ): VendorFilter.ValidationFuncResponse => {
    const validMainChoices = mainChoices.filter((mc) => {
      let choiceFilters = this.filters.singleChoiceFilters;

      for (const choiceGroup of mc.choiceGroups) {
        for (const choice of choiceGroup.choices) {
          if (choiceFilters?.includes(choice.filterType)) {
            choiceFilters = choiceFilters.filter(
              (cf) => cf !== choice.filterType
            );
          }
        }
      }

      return (choiceFilters?.length ?? 0) === 0;
    });

    return validMainChoices;
  };

  public validateMainChoiceAttributes: VendorFilter.ValidationFunc = (
    mainChoices
  ) => {
    const { mainChoiceAttributes } = this.filters;

    if (!mainChoiceAttributes?.length) return mainChoices;

    return mainChoices.filter((mainChoice) => {
      return mainChoiceAttributes?.every((attribute) =>
        mainChoice.attributes.map((a) => a.filterName).includes(attribute)
      );
    });
  };

  protected generalValidationFuncs: VendorFilter.ValidationFunc[] = [
    this.validateMainChoiceAttributes,
    this.validateChoiceGroupSingleChoices,
  ];

  protected vendorSpecificValidationFuncs: VendorFilter.ValidationFunc[] = [];

  public validateVendor = () => {
    let mainChoices = this.vendor.mainChoices;

    const allValidationFuncs = [
      ...this.generalValidationFuncs,
      ...this.vendorSpecificValidationFuncs,
    ];

    for (const func of allValidationFuncs) {
      mainChoices = func(mainChoices);

      if (!mainChoices.length) return false;
    }

    return true;
  };
}
