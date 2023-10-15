import { LambdaHandler } from "../../utils/LambdaHandler";
import db from "../../models";

export const lambdaHandler = LambdaHandler.handler(
  async ({ body, headers }, handler) => {
    const vendors = await db.Vendor.findAll({
      attributes: db.Vendor.includedAttributes,
      include: [db.MainChoice.populatedIncludable],
    });

    console.log(vendors.map((v) => v.toJSON()));
    const res = handler.response({ vendors: vendors.map((v) => v.toJSON()) });

    return res;
  }
);
