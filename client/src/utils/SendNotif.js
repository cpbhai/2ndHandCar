import { SHOW_NOTIF } from "../constants/designConstants";

const SendNotif = (bg, msg) => {
  return { type: SHOW_NOTIF, payload: { bg, msg } };
};

export default SendNotif;
