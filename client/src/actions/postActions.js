import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/keys";
import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  GET_ALL_CATS_REQUEST,
  GET_ALL_CATS_SUCCESS,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/postConstants";
const token = cookie.load("token");
export const loadCats = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATS_REQUEST });
  const config = {};
  const link = `${BASE_URL}/api/v1/category/getAll`;
  try {
    const { data } = await axios.get(link, config);
    if (data.success) {
      dispatch({ type: GET_ALL_CATS_SUCCESS, payload: data.categories });
    } else dispatch({ type: GET_ALL_CATS_SUCCESS, payload: [] });
  } catch (err) {
    dispatch({ type: GET_ALL_CATS_SUCCESS, payload: [] });
  }
};
export const getProdData = (query) => async (dispatch) => {
  dispatch({ type: GET_ALL_POSTS_REQUEST });
  const config = {
    headers: {},
  };
  const link = `${BASE_URL}/api/v1/post/getAll${query}`;
  try {
    const { data } = await axios.get(link, config);
    if (data.success)
      dispatch({
        type: GET_ALL_POSTS_SUCCESS,
        payload: {
          posts: data.posts,
          totalPages: data.totalPages,
          page: data.page,
        },
      });
    else throw new Error("Please, Refresh the Page.");
  } catch (err) {
    dispatch({
      type: NEW_POST_FAIL,
      payload: err.message,
    });
  }
};
export const newPost = (formData) => async (dispatch) => {
  dispatch({ type: NEW_POST_REQUEST });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const link = `${BASE_URL}/api/v1/post/add`;
  try {
    const { data } = await axios.post(link, formData, config);
    if (data.success) {
      dispatch({
        type: NEW_POST_SUCCESS,
        payload: data.message,
      });
    } else
      dispatch({
        type: NEW_POST_FAIL,
        payload: data.message,
      });
  } catch (err) {
    dispatch({
      type: NEW_POST_FAIL,
      payload: "Please Try Again.",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
