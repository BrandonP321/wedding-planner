import { VendorFilter } from "./VendorFilter";
import { VenueFilterTypes } from "@wedding-planner/shared/common/types/vendor/filters";

export namespace VenueFilter {}

export class VenueFilter extends VendorFilter {
  protected validateGuestCapacity: VendorFilter.ValidationFunc = (
    mainChoices
  ) => {
    const requiredCapacity =
      this.filters.choiceGroupFilters[
        VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY
      ];

    const mainChoicesSupportingCapacity = mainChoices.filter((mc) => {
      const capacityChoiceGroup = mc.choiceGroups.find(
        (cg) =>
          cg.filterType === VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY
      );

      // TODO: Consider different handling for edge cases where guest capacity is not defined
      if (!capacityChoiceGroup) return true;

      const hasChoiceWithRequiredCapacity = capacityChoiceGroup.choices.some(
        (choice) => {
          return choice.value >= requiredCapacity;
        }
      );

      return hasChoiceWithRequiredCapacity;
    });

    return mainChoicesSupportingCapacity;
  };

  protected vendorSpecificValidationFuncs: VendorFilter.ValidationFunc[] = [
    this.validateGuestCapacity,
  ];
}
