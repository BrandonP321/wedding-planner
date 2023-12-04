import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";
import { useEffect, useState } from "react";
import { Actions } from "store";
import { useVendor } from "store/hooks";
import { useAppDispatch } from "store/store";
import { APIFetcher } from "utils";

type FetchStatus = "FETCHING" | "SUCCESS" | "ERROR" | null;

let fetchStatus: FetchStatus = null;

type Props = {
  reFetchOnMount?: boolean;
};

export const useAuthedVendorListing = (props?: Props) => {
  const { reFetchOnMount = false } = props ?? {};

  const { vendor: listing, loading } = useVendor();
  const dispatch = useAppDispatch();

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const fetchListing = () => {
    if (fetchStatus === "FETCHING") {
      return;
    }

    fetchStatus = "FETCHING";
    setErrMsg(null);
    dispatch(Actions.Vendor.setLoading({ loading: true }));

    APIFetcher.getAuthedListing()
      .then(({ vendor }) => {
        fetchStatus = "SUCCESS";
        dispatch(Actions.Vendor.setVendor({ vendor }));
      })
      .catch((err: DefaultAPIError.ErrorResponse) => {
        fetchStatus = "ERROR";
        setErrMsg(err.msg);
      })
      .finally(() => {
        dispatch(Actions.Vendor.setLoading({ loading: false }));
      });
  };

  useEffect(() => {
    if (!listing && !fetchStatus) {
      fetchListing();
    }
  }, [listing, dispatch]);

  useEffect(() => {
    if (fetchStatus && reFetchOnMount) {
      fetchListing();
    }
  }, []);

  return { listing, errMsg, loading };
};
