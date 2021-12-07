import "./Signup.css";
import { Fragment, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SendNotif from "../../utils/SendNotif";
import Loading from "../Design/Loading/Loading";
import { useNavigate } from "react-router-dom";
import {
  signup,
  clearErrors,
  clearMessages,
} from "../../actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../../utils/MetaData";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.client);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const params = new URLSearchParams(window.location.search);
  const guide = params.get("guide");
  useEffect(() => {
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      if (message) {
        dispatch(SendNotif("success", message));
        dispatch(clearMessages());
      }
      if (guide) navigate(guide);
      else navigate("/");
    }
  }, [dispatch, error, message, isAuthenticated, navigate, guide]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");
  const [err3, setErr3] = useState("");
  const [err4, setErr4] = useState("");
  const { name, email, phone, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    let noError = 0;
    if (!name || name.length > 30) {
      ++noError;
      setErr1("Empty name OR longer than 30.");
    } else {
      setErr1("");
    }
    if (!email || !email.includes("@")) {
      ++noError;
      setErr2("Invalid Email.");
    } else {
      setErr2("");
    }
    if (phone.length !== 10) {
      ++noError;
      setErr3("Phone length is not 10.");
    } else {
      setErr3("");
    }
    if (password.length < 8) {
      ++noError;
      setErr4("Password length is not 8 atleast.");
    } else {
      setErr4("");
    }
    if (noError === 0) dispatch(signup(name, email, phone, password));
  };
  return (
    <Fragment>
      <MetaData title="Signup | 2ndHandCar" />

      <Loading show={loading} />
      <h1 className="NewUser">New User</h1>
      <div className="mainDivInput">
        <div className="divComb">
          <div className="txtFieldDiv">
            <TextField
              error={Boolean(err1)}
              helperText={err1}
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              label="Your Name"
            />
          </div>
          <div className="txtFieldDiv">
            <TextField
              error={Boolean(err2)}
              helperText={err2}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              label="Your Email"
            />
          </div>
        </div>
        <div className="divComb">
          <div className="txtFieldDiv">
            <TextField
              error={Boolean(err3)}
              helperText={err3}
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              label="Your Phone"
            />
          </div>
          <div className="txtFieldDiv">
            <TextField
              error={Boolean(err4)}
              helperText={err4}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              label="Password"
            />
          </div>
        </div>
        <div className="spaceAboveButton"></div>
        <Button
          variant="contained"
          color="success"
          startIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </div>
      <div className="spaceAboveCancel"></div>
      <div className="Cancel">
        <Link to={guide ? `/login?guide=${guide}` : "/login"} className="Link">
          <p>Have an account? Login</p>
        </Link>
      </div>
    </Fragment>
  );
};

export default Signup;
