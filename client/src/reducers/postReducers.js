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

export const postReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_POST_REQUEST:
    case GET_ALL_CATS_REQUEST:
    case GET_ALL_POSTS_REQUEST:
      return { ...state, loading: true };

    case NEW_POST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case GET_ALL_CATS_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        loading: false,
        postData: action.payload.posts,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
      };

    case NEW_POST_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
