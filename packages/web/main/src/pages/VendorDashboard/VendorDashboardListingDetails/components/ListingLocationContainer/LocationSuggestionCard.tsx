import styles from "../../VendorDashboardListingDetails.module.scss";
import { Button } from "@wedding-planner/shared/web/components";

export type LocationSuggestionCardProps = {
  onClick: () => void;
  address: string;
};

export const LocationSuggestionCard = (props: LocationSuggestionCardProps) => {
  const { address, onClick } = props;

  return (
    <Button classes={{ root: styles.locationCard }} onClick={onClick}>
      {address}
    </Button>
  );
};
