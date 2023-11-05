import { APIErrorMap, APIErrorResponse } from "..";
import { DefaultAPIError } from "../requestErrors";
import { VenueFilterTypes } from "../../../common/types";
import { MainChoiceModel } from "../../models/mainChoice";

export namespace UpdateMainChoicesRequest {
  export type ReqBody = {
    vendorId: number;
    // TODO: Remove creation attributes after implementing grabbing coords from address
    mainChoices: MainChoiceModel.CreationOrUpdateParams[];
  };

  export type ResBody = {
    vendorId: number;
  };

  export const ErrorCodes = {
    ...DefaultAPIError.Codes,
    VendorNotFound: "VendorNotFound",
  } as const;

  export const Errors: APIErrorMap<typeof ErrorCodes> = {
    ...DefaultAPIError.Errors,
    VendorNotFound: {
      code: ErrorCodes.VendorNotFound,
      msg: "Vendor not found",
      statusCode: 404,
    },
  };

  export type ErrorResponse = APIErrorResponse<typeof Errors>;
}

const test: UpdateMainChoicesRequest.ReqBody = {
  vendorId: 1,
  mainChoices: [
    {
      name: "Some name",
      attributes: [
        { filterName: VenueFilterTypes.MainChoiceFilter.DRESSING_ROOM },
      ],
      choiceGroups: [
        {
          filterType: "none",
          name: "Some name",
          choices: [
            {
              filterType: "none",
              name: "Some name",
              price: 1000,
              value: 1000,
            },
          ],
        },
      ],
    },
  ],
};
