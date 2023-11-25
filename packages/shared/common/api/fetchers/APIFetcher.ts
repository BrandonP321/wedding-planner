import { LoginVendorAccountRequest } from "../../../api/requests/auth/LoginVendorAccount.request";
import { RegisterVendorAccountRequest } from "../../../api/requests/auth/RegisterVendorAccount.request";
import { GetCitySuggestionsRequest } from "../../../api/requests/places/getCitySuggestions.request";
import { AssociateVendorTempAssetsRequest } from "../../../api/requests/s3/associateVendorTempAssets.request";
import { GetS3PresignedUrlForVendorImageUploadRequest } from "../../../api/requests/s3/getS3PresignedUrlForVendorImageUpload.request";
import { CreateVendorListingRequest } from "../../../api/requests/vendor/createVendorListing.request";
import { GetAuthedVendorListingRequest } from "../../../api/requests/vendor/getAuthedVendorListing.request";
import { SearchVendorListingRequest } from "../../../api/requests/vendor/searchVendorListings.request";
import { UpdateMainChoicesRequest } from "../../../api/requests/vendor/updateMainChoices.request";
import { UpdateVendorListingRequest } from "../../../api/requests/vendor/updateVendorListing.request";
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

  associateVendorTempAssets = (
    params: AssociateVendorTempAssetsRequest.ReqBody
  ) =>
    this.post<AssociateVendorTempAssetsRequest.ResBody>(
      APIRoute.S3.AssociateVendorTempAssets,
      params
    );

  registerVendorAccount = (params: RegisterVendorAccountRequest.ReqBody) =>
    this.post<RegisterVendorAccountRequest.ResBody>(
      APIRoute.VendorAuth.Register,
      params
    );

  loginVendorAccount = (params: LoginVendorAccountRequest.ReqBody) =>
    this.post<LoginVendorAccountRequest.ResBody>(
      APIRoute.VendorAuth.Login,
      params
    );

  signoutVendorAccount = () => this.post(APIRoute.VendorAuth.Register, {});

  createListing = (params: CreateVendorListingRequest.ReqBody) =>
    this.post<CreateVendorListingRequest.ResBody>(
      APIRoute.Vendor.CreateVendorListing,
      params
    );

  updateListing = (params: UpdateVendorListingRequest.ReqBody) =>
    this.post<UpdateVendorListingRequest.ResBody>(
      APIRoute.Vendor.UpdateVendorListing,
      params
    );

  getAuthedListing = () =>
    this.post<GetAuthedVendorListingRequest.ResBody>(
      APIRoute.Vendor.GetAuthedListing,
      {}
    );

  updateMainChoices = (params: UpdateMainChoicesRequest.ReqBody) =>
    this.post<UpdateMainChoicesRequest.ResBody>(
      APIRoute.Vendor.UpdateMainChoices,
      params
    );
}
