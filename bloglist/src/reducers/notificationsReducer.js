import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: "success",
    content: "",
  },
  reducers: {
    notificationSet(state, action) {
      return action.payload;
    },
    notificationRemove() {
      return {
        type: "success",
        content: "",
      };
    },
  },
});

export const { notificationSet, notificationRemove } =
  notificationSlice.actions;

export const setNotification = (type, content, duration) => {
  //console.log("setNotification", type, content, duration);
  return async (dispatch) => {
    dispatch(notificationSet({ type: type, content: content }));
    setTimeout(() => dispatch(notificationRemove()), duration * 1000);
  };
};

export default notificationSlice.reducer;
