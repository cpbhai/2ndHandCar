import { SHOW_NOTIF, HIDE_NOTIF } from "../constants/designConstants";
  
  export const designReducer = (
    state = {
      notifbg: "",
      notifmsg: "",
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
      default:
        return state;
    }
  };
  