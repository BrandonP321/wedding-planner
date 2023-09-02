import { configureStore } from "@reduxjs/toolkit";
import {
  NotificationActions,
  appLayoutSlice,
  notificationsSlice,
  responsiveSlice,
} from "./slices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

/** Temporary store to annotate types */
const tempStore = configureStore({
  reducer: {
    ...responsiveSlice.reducer,
    ...appLayoutSlice.reducer,
    ...notificationsSlice.reducer,
  },
});

type RootState = ReturnType<typeof tempStore.getState>;
type AppDispatch = typeof tempStore.dispatch;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useResponsive = () => useAppSelector((state) => state.responsive);
export const useAppLayout = () => useAppSelector((state) => state.appLayout);
export const useNotifications = () =>
  useAppSelector((state) => state.notifications);

type UseFetchOptions = {
  fetchOnMount?: boolean;
  overrideDefaultErrorHandling?: boolean;
};

export const useFetch = <T extends (...params: any[]) => any>(
  apiCall: T,
  { fetchOnMount, overrideDefaultErrorHandling }: UseFetchOptions
) => {
  const [response, setResponse] = useState<ReturnType<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const dispatch = useDispatch();

  const makeAPICall = async (...params: Parameters<T>) => {
    setIsLoading(true);
    setErrMsg(null);

    apiCall(...params)
      .then(setResponse)
      .catch((err: { msg: string }) => {
        setErrMsg(err.msg);

        overrideDefaultErrorHandling &&
          dispatch(NotificationActions.Notifications.pushErr(err));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchOnMount && makeAPICall(...([] as any));
  }, []);

  return { response, isLoading, errMsg, makeAPICall };
};
