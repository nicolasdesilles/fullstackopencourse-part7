import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

import { setNotification } from "./notificationsReducer";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedUser } = loggedUserSlice.actions;

export const login = ({ username, password }) => {
  return async (dispatch) => {
    console.log(
      `trying login with username = ${username} and password = ${password}`
    );

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);

      dispatch(
        setNotification(
          "success",
          `successfully logged in as ${user.username}`,
          4
        )
      );

      dispatch(setLoggedUser(user));
    } catch (exception) {
      console.error("login failed: wrong credentials");
      dispatch(setNotification("error", "wrong userame or password", 2));
    }
  };
};

export const getLoggedInUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
    //console.log("local storage", loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setLoggedUser(user));
    }
  };
};

export const logout = (user) => {
  return async (dispatch) => {
    console.log(`logging out user ${user.name}`);
    window.localStorage.removeItem("loggedBloglistAppUser");
    dispatch(setLoggedUser(null));

    dispatch(setNotification("success", "successfully logged out", 2));
  };
};

export default loggedUserSlice.reducer;
