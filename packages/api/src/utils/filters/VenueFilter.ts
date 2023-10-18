import { VendorFilter } from "./VendorFilter";
import { VenueFilterTypes } from "@wedding-planner/shared/common/types/vendor/filters";

export namespace VenueFilter {}

export class VenueFilter extends VendorFilter {
  protected validateGuestCapacity: VendorFilter.ValidationFunc = (
    mainChoices
  ) => {
    return this.choiceGroupMaxValueValidation(
      mainChoices,
      VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY
    );
  };

  public vendorSpecificValidationFuncs: VendorFilter.ValidationFunc[] = [
    this.validateGuestCapacity,
  ];
}
