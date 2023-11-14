import { KeyOf } from "../../../common";
import { DefaultModel } from "../../../common/types";

export namespace VendorAccountModel {
  export const Name = "vendorAccount";

  export type Base = {
    email: string;
    password: string;
    businessName: string;
    phoneNumber: string;
    fullName: string;
    // jwtHash: string;
    // TODO: add email verification before implementing subscriptions
    // isEmailVerified: boolean;
    // emailVerification?: {}
  };

  export type Attributes = Base & DefaultModel.Attributes;

  export type IncludedAttributes = KeyOf<Attributes, keyof Attributes>;

  export type CreationOrUpdateParams = Pick<Attributes, IncludedAttributes> & {
    id?: number;
  };

  export type Response = Pick<Attributes, IncludedAttributes>;
}
