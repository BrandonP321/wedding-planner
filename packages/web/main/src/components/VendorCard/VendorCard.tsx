import styles from "./VendorCard.module.scss";
import { Vendor } from "@wedding-planner/shared/common/types";
import { AspectRatioImage } from "@wedding-planner/shared/web/components";
import { Link } from "react-router-dom";
import { RouteHelper } from "utils/RouteHelper";

export type VendorCardProps = Vendor.SearchResult & {};

export const VendorCard = ({ ...v }: VendorCardProps) => {
  return (
    <Link
      to={RouteHelper.VendorDetails({ vendorId: "12345" })}
      className={styles.card}
    >
      <AspectRatioImage img={v.thumbnail} />
      <div className={styles.vendorInfo}>
        <p className={styles.name}>{v.name}</p>
        <p>{v.price}</p>
        <p className={styles.city}>{v.city}</p>
      </div>
    </Link>
  );
};
