import {
  SHOW_NOTIF,
  HIDE_NOTIF,
  SHOW_MAIN_DRAWER,
  HIDE_MAIN_DRAWER,
  SHOW_FILTER_DRAWER,
  HIDE_FILTER_DRAWER,
} from "../constants/designConstants";

export const designReducer = (
  state = {
    notifbg: "",
    notifmsg: "",
    maindrawer: false,
    filterDrawer: false,
  },
  action
) => {
  switch (action.type) {
    case SHOW_NOTIF:
      return {
        notif: true,
        notifbg: action.payload.bg,
        notifmsg: action.payload.msg,
      };
    case HIDE_NOTIF:
      return { notif: false };
    case SHOW_MAIN_DRAWER:
      return { maindrawer: true };
    case HIDE_MAIN_DRAWER:
      return { maindrawer: false };
    case SHOW_FILTER_DRAWER:
      return { filterDrawer: true };
    case HIDE_FILTER_DRAWER:
      return { filterDrawer: false };
    default:
      return state;
  }
};
