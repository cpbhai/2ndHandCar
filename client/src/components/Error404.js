import { Fragment } from "react";
import MetaData from "../utils/MetaData";
const Error404 = () => {
  return (
    <Fragment>
      <MetaData title="Page Not Found - 404 | 2ndHandCar" />

      <img
        src="/404.jpg"
        alt="404"
        style={{
          height: "87vh",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </Fragment>
  );
};

export default Error404;
