import MuiAlert from "@mui/material/Alert";
import React, { Fragment } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_NOTIF } from "../../constants/designConstants";

const Notify = () => {
  const dispatch = useDispatch();
  const { notif, notifbg, notifmsg } = useSelector((state) => state.design);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = () => {
    dispatch({ type: HIDE_NOTIF });
  };
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={notif}
        autoHideDuration={5000}
        onClose={() => handleClose()}
      >
        <Alert onClose={() => handleClose()} severity={notifbg}>
          {notifmsg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Notify;
