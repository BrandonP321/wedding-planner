import { MainChoiceModel } from "@wedding-planner/shared/api/models/mainChoice";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { VendorMainChoiceFilterType } from "@wedding-planner/shared/common/types";

export namespace VendorFilter {
  export type Filters = {
    mainChoiceAttributes: VendorMainChoiceFilterType[];
    choiceGroupFilters: Record<string, number>;
  };

  export type ValidationFunc = (
    mainChoices: MainChoiceModel.Populated[]
  ) => MainChoiceModel.Populated[];
}

export class VendorFilter {
  protected vendor: VendorModel.Populated;
  protected filters: VendorFilter.Filters;

  constructor(vendor: VendorModel.Populated, filters: VendorFilter.Filters) {
    this.vendor = vendor;
    this.filters = filters;
  }

  public validateMainChoiceAttributes: VendorFilter.ValidationFunc = (
    mainChoices
  ) => {
    const { mainChoiceAttributes } = this.filters;

    return mainChoices.filter((mainChoice) => {
      return mainChoiceAttributes.every((attribute) =>
        mainChoice.attributes.map((a) => a.filterName).includes(attribute)
      );
    });
  };

  protected generalValidationFuncs: VendorFilter.ValidationFunc[] = [
    this.validateMainChoiceAttributes,
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
