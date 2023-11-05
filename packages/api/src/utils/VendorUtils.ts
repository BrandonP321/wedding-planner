import { Vendor } from "@wedding-planner/shared/common/types";
import db, { sequelize } from "../models";
import { VendorModel } from "@wedding-planner/shared/api/models/vendor";

export class VendorUtils {
  public static createOrUpdateVendor = async (
    vendor: VendorModel.CreationOrUpdateAttributes &
      VendorModel.CreationOrUpdateAttributes
  ) => {
    return await sequelize.transaction(async (transaction) => {
      // Vendor
      const {
        res: { id: vendorId },
      } = await db.Vendor.createOrUpdate({
        model: vendor,
        transaction,
      });

      // Links
      await Promise.all(
        vendor.links.map(
          async (link) =>
            await db.Link.createOrUpdate({ model: link, vendorId, transaction })
        )
      );

      // Social Links
      await Promise.all(
        vendor.socialLinks.map(
          async (link) =>
            await db.Link.createOrUpdate({ model: link, vendorId, transaction })
        )
      );

      return { vendorId };
    });
  };
}
