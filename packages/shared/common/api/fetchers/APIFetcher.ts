import { GetCitySuggestionsRequest } from "../../../api/requests/places/getCitySuggestions.request";
import { GetS3PresignedUrlForVendorImageUploadRequest } from "../../../api/requests/s3/getS3PresignedUrlForVendorImageUpload.request";
import { SearchVendorListingRequest } from "../../../api/requests/vendor/searchVendorListings.request";
import { APIFetcherBase } from "../../utils";
import { APIRoute } from "../routes";

export class APIFetcherInternal extends APIFetcherBase {
  getCitySuggestions = (params: GetCitySuggestionsRequest.ReqBody) =>
    this.post<GetCitySuggestionsRequest.ResBody>(
      APIRoute.Places.GetCitySuggestions,
      params
    );

  searchVendorListings = (params: SearchVendorListingRequest.ReqBody) =>
    this.post<SearchVendorListingRequest.ResBody>(
      APIRoute.Vendor.SearchVendorListings,
      params
    );

  getVendorImageUploadPresignedUrl = (
    params: GetS3PresignedUrlForVendorImageUploadRequest.ReqBody
  ) =>
    this.post<GetS3PresignedUrlForVendorImageUploadRequest.ResBody>(
      APIRoute.S3.GetVendorImageUploadPresignedUrl,
      params
    );
}
