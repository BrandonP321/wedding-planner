import styles from "./VendorCard.module.scss";
import { Vendor } from "@wedding-planner/shared/common/types";
import { AspectRatioImage } from "@wedding-planner/shared/web/components";
import { Link } from "react-router-dom";

export type VendorCardProps = Vendor.SlimVendor & {};

export const VendorCard = ({ city, name, thumbnail }: VendorCardProps) => {
  return (
    <Link to={"/vendor"} className={styles.card}>
      <AspectRatioImage img={thumbnail} />
      <div className={styles.vendorInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.city}>{city}</div>
      </div>
    </Link>
  );
};
