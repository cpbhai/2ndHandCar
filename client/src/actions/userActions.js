import cookie from "react-cookies";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../constants/userConstants";
import { CLIENT_DETAILS, NO_CLIENT } from "../constants/clientConstants";
const token = cookie.load("token");

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  const config = {
    method: "GET",
    headers: { Authorization: token },
  };
  await fetch(`/api/v1/user/me`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        if (data.user.role === "user")
          dispatch({
            type: CLIENT_DETAILS,
            payload: data.user,
          });
        dispatch({
          type: LOAD_USER_SUCCESS,
        });
      } else {
        cookie.remove("token", { path: "/" });
        dispatch({ type: LOAD_USER_FAIL });
      }
    })
    .catch((err) => {
      dispatch({ type: LOAD_USER_FAIL });
    });
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const config = {
    method: "GET",
    headers: { Authorization: token },
  };
  await fetch(`/api/v1/user/logout`, config)
    .then((response) => response.json())
    .then((data) => {
      cookie.remove("token", { path: "/" });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      if (data.role === "user")
        dispatch({
          type: NO_CLIENT,
        });
    });
};