import "./Login.css";
import { Fragment, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SendNotif from "../../utils/SendNotif";
import Loading from "../Design/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { login, clearErrors, clearMessages } from "../../actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.client);
  const { isAuthenticated } = useSelector((state) => state.auth);
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
      navigate("/");
    }
  }, [dispatch, error, message, isAuthenticated, navigate]);
  const [values, setValues] = useState({
    ID: "",
    password: "",
  });
  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");
  const { ID, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    let noError = 0;
    if (!ID) {
      ++noError;
      setErr1("Email or Phone is missing.");
    } else {
      setErr1("");
    }
    if (!password) {
      ++noError;
      setErr2("Password is missing.");
    } else {
      setErr2("");
    }
    if (noError === 0) dispatch(login(ID, password));
  };
  return (
    <Fragment>
      <Loading show={loading} />
      <h1 className="NewUser">Login</h1>
      <div className="mainDivInput">
        <TextField
          error={Boolean(err1)}
          helperText={err1}
          type="text"
          name="ID"
          value={ID}
          onChange={handleChange}
          label="Email or Phone"
        />
        <div className="spanDiv"></div>
        <TextField
          error={Boolean(err2)}
          helperText={err2}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
        />
      </div>
      <div className="spaceAboveButton"></div>
      <div className="btnDiv">
        <Button
          variant="contained"
          color="success"
          startIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          login
        </Button>
        <div className="spaceAboveCancel"></div>
        <div className="Cancel">
          <Link to="/signup" className="Link">
            <p>New User? Signup</p>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
