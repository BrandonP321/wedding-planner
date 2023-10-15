import { APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { Vendor, VenueFilterTypes } from "../../../common/types";

export namespace CreateVendorListingRequest {
  export type ReqBody = {
    vendor: Vendor.VendorWithoutIDs;
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
