import { Fragment, useState, useEffect } from "react";
import "./Post.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import SendNotif from "../../../utils/SendNotif";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";
import PostStyle from "./PostStyle";
import Loading from "../../Design/Loading/Loading";
import {
  newPost,
  loadCats,
  clearErrors,
  clearMessages,
} from "../../../actions/postActions";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../utils/MetaData";
const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, categories } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (!categories) dispatch(loadCats());
    else setAllCats(categories);
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(SendNotif("success", message));
      dispatch(clearMessages());
      navigate("/");
    }
  }, [dispatch, error, message, navigate, categories]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [allCats, setAllCats] = useState(categories ? categories : []);
  const [category, setCategory] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
    discost: "",
    maxcost: "",
    phone: "",
  });
  const { title, description, discost, maxcost, phone } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setPreviews([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviews((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = () => {
    if (!title) return dispatch(SendNotif("error", "Title is blank."));
    if (!category)
      return dispatch(SendNotif("error", "Category was not selected."));
    if (!description)
      return dispatch(SendNotif("error", "Description is blank."));
    if (discost === "")
      return dispatch(SendNotif("error", "Cost After Discount is blank."));
    if (maxcost === "")
      return dispatch(SendNotif("error", "Cost Without Discount is blank."));
    if (images.length === 0)
      return dispatch(SendNotif("error", "At least 1 image is must."));
    if (phone === "")
      return dispatch(SendNotif("error", "Contact No. is missing."));
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("category", category);
    myForm.append("description", description);
    myForm.append("discost", discost);
    myForm.append("maxcost", maxcost);
    myForm.append("phone", phone);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(newPost(myForm));
  };
  const useStyles = makeStyles((theme) => PostStyle(theme));
  const classes = useStyles();
  return (
    <Fragment>
      <MetaData title="New Post of your Car" />
      <Loading show={loading} />
      <h1 className="addPHeader">Add Car Details</h1>
      <div className="firstDiv">
        <TextField
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          label="Title of Car details"
        />
        <div style={{ width: "20px" }}></div>
        <div className="selectDiv">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {allCats.map((cat, idx) => (
                <MenuItem key={idx} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="secondDiv">
        <TextareaAutosize
          className={classes.desc}
          minRows={6}
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
          style={{
            "@media (minDeviceWidth:1200px)": {
              width: 600,
            },
          }}
        />
      </div>
      <div className="thirdDiv">
        <TextField
          type="number"
          name="discost"
          value={discost}
          onChange={handleChange}
          label="Cost After Discount."
        />
        <div style={{ width: "10px" }}></div>
        <TextField
          type="number"
          name="maxcost"
          value={maxcost}
          onChange={handleChange}
          label="Cost Without Discount."
        />
      </div>
      <div className="fourthDiv">
        <FormControl fullWidth>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              name="images"
              id="icon-button-file"
              multiple
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
            <IconButton
              color="secondary"
              aria-label="upload picture"
              sx={{ marginLeft: "-9px" }}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            {previews.length ? (
              <div className="dFlex jusCent previewDiv">
                {previews.map((img, idx) => (
                  <img key={idx} src={img} alt="..." className="previewImg" />
                ))}
              </div>
            ) : (
              <span style={{ color: "darkgray", cursor: "pointer" }}>
                Add Images of Car
              </span>
            )}
          </label>
        </FormControl>
      </div>
      <div className="fifthDiv">
        <TextField
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          label="Contact No."
        />
        <div style={{ width: "10px" }}></div>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </div>
    </Fragment>
  );
};

export default Post;
