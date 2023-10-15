import { APIErrorResponse } from "..";
import { MainChoiceModel } from "../../models/mainChoice";
import { MainChoiceAttributeModel } from "../../models/mainChoiceAttribute";
import { ChoiceGroupModel } from "../../models/choiceGroup";
import { ChoiceModel } from "../../models/choice";
import { DefaultAPIError } from "../requestErrors";
import { VendorModel } from "../../models/vendor";
import { VenueFilterTypes } from "../../../common/types";

export namespace CreateVendorListingRequest {
  export type Choice = Pick<ChoiceModel.Base, "name" | "price" | "value">;
  export type ChoiceGroup = Pick<ChoiceGroupModel.Base, "name" | "type"> & {
    choices: Choice[];
  };
  export type MainChoiceAttribute = Pick<
    MainChoiceAttributeModel.Base,
    "filterName"
  >;
  export type MainChoice = Pick<MainChoiceModel.Base, "name"> & {
    attributes: MainChoiceAttribute[];
    choiceGroups: ChoiceGroup[];
  };
  export type Vendor = VendorModel.Base & { mainChoices: MainChoice[] };

  export type ReqBody = {
    vendor: Vendor;
  };

  export type ResBody = {
    vendorId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
  };

  export const Errors = {
    ...DefaultAPIError.Errors,
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}

const exampleRequest: CreateVendorListingRequest.ReqBody = {
  vendor: {
    city: "some city",
    name: "some name",
    description: "some description",
    mainChoices: [
      {
        name: "some main choice",
        attributes: [
          { filterName: VenueFilterTypes.MainChoiceFilter.OUTDOOR_VENUE },
        ],
        choiceGroups: [
          {
            name: "some choice group",
            type: VenueFilterTypes.ChoiceGroupFilter.GUEST_CAPACITY,
            choices: [
              {
                name: "some choice",
                price: 123,
                value: 333,
              },
            ],
          },
        ],
      },
    ],
  },
};
