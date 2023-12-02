import { DefaultAPIError } from "@wedding-planner/shared/api/requests/requestErrors";
import { useEffect, useState } from "react";
import { Actions } from "store";
import { useVendorAccount } from "store/hooks";
import { useAppDispatch } from "store/store";
import { APIFetcher } from "utils";

type FetchStatus = "FETCHING" | "SUCCESS" | "ERROR" | null;

let fetchStatus: FetchStatus = null;

export const useAuthedVendorAccount = () => {
  const { account, loading } = useVendorAccount();
  const dispatch = useAppDispatch();

  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!account && !fetchStatus) {
      fetchStatus = "FETCHING";
      setErrMsg(null);
      dispatch(Actions.Vendor.setLoading({ loading: true }));

      APIFetcher.getAuthedVendorAccount()
        .then((res) => {
          fetchStatus = "SUCCESS";
          dispatch(Actions.VendorAccount.setAccount({ account: res }));
        })
        .catch((err: DefaultAPIError.ErrorResponse) => {
          fetchStatus = "ERROR";
          setErrMsg(err.msg);
        })
        .finally(() => {
          dispatch(Actions.VendorAccount.setLoading({ loading: false }));
        });
    }
  }, [account, dispatch]);

  return { account, errMsg, loading };
};
