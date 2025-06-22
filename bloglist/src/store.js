import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationsReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
