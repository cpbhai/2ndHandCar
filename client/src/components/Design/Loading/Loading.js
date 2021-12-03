import Backdrop from "@mui/material/Backdrop";
import "./Loading.css";
const Loading = ({ show }) => {
  //show may be undefined so used ternary ops
  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0 , 0, 0, 0.5)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={show ? true : false}
    >
     <div className="spinner-8"></div>

    </Backdrop>
  );
};
export default Loading;
