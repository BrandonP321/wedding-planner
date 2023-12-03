import { MapsPlaceGeocodeResponse } from "@wedding-planner/shared/common/utils/MapsAPIFetcher";
import { MapsAPIFetcher } from "../../utils";
import { Controller } from "../../utils/ControllerUtils";
import { GetAddressDetailsRequest } from "@wedding-planner/shared/api/requests/places/getAddressDetails.request";

const controller = new Controller<
  GetAddressDetailsRequest.ReqBody,
  GetAddressDetailsRequest.ResBody,
  {},
  typeof GetAddressDetailsRequest.Errors
>(GetAddressDetailsRequest.Errors);

export const GetAddressDetailsController = controller.handler(
  async (req, res) => {
    const { placeId } = req.body;

    const response = await MapsAPIFetcher.getAddressDetails(placeId);

    const { lat, lng } = response.results[0].geometry.location;

    const [streetNumber, streetRoute, city, state, zipCode] = await Promise.all(
      [
        getAddressComponentValue(response, "street_number"),
        getAddressComponentValue(response, "route"),
        getAddressComponentValue(response, "locality"),
        getAddressComponentValue(response, "administrative_area_level_1"),
        getAddressComponentValue(response, "postal_code"),
      ]
    );

    return res
      .json({
        lat,
        lng,
        city,
        state,
        zipCode,
        streetAddress: `${streetNumber} ${streetRoute}`,
      })
      .end();
  }
);

async function getAddressComponentValue(
  response: MapsPlaceGeocodeResponse,
  componentType: string
) {
  const component = response.results[0].address_components.find((c) =>
    c.types.includes(componentType)
  );

  return component ? component.long_name : "";
}
