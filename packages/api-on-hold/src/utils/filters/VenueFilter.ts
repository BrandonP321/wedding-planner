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
        (cg) => cg.type === VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY
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

console.log(
  new VenueFilter(
    {
      city: "",
      description: "",
      id: 1,
      media: [],
      name: "",
      socialMediaLinks: [],
      mainChoices: [
        {
          name: "",
          vendorId: 1,
          attributes: [
            {
              filterName: VenueFilterTypes.MainChoiceFilter.OUTDOOR_VENUE,
              mainChoiceId: 1,
            },
          ],
          choiceGroups: [
            {
              mainChoiceId: 1,
              name: "",
              type: VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY,
              choices: [
                {
                  choiceGroupId: 1,
                  id: 1,
                  name: "",
                  price: 1000,
                  value: 25,
                },
                {
                  choiceGroupId: 1,
                  id: 1,
                  name: "",
                  price: 2000,
                  value: 59,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      mainChoiceAttributes: [VenueFilterTypes.MainChoiceFilter.OUTDOOR_VENUE],
      choiceGroupFilters: {
        [VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY]: 50,
      },
    }
  ).validateVendor()
);
