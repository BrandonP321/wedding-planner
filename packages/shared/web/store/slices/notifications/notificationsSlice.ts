import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createExportedSlice } from "../sliceHelpers";

type NotificationType = "info" | "danger" | "success";

type Notification = {
  msg: string;
  type: NotificationType;
};

export interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const pushNotification = (
  state: NotificationsState,
  msg: string,
  type: NotificationType
) => {
  state.notifications = [...state.notifications, { msg, type }];
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushErr: (state, { payload }: PayloadAction<{ msg: string }>) => {
      pushNotification(state, payload.msg, "danger");
    },
    pushInfo: (state, { payload }: PayloadAction<{ msg: string }>) => {
      pushNotification(state, payload.msg, "info");
    },
    pushSuccess: (state, { payload }: PayloadAction<{ msg: string }>) => {
      pushNotification(state, payload.msg, "success");
    },
  },
});

export const notificationsSlice = createExportedSlice(
  { notifications: slice.reducer },
  slice.actions
);
