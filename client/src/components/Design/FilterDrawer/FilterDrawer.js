import { Fragment, useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";
import { HIDE_FILTER_DRAWER } from "../../../constants/designConstants";
import { getProdData } from "../../../actions/postActions";
// import { makeStyles } from "@material-ui/core";
// import DrawerStyle from "./DrawerStyle";
import "./FilterDrawer.css";
import { BASE_URL } from "../../../utils/keys";
import preserveURL from "../../../utils/preserveURL";

export default function FilterDrawer({ show }) {
  const dispatch = useDispatch();
  const loadCats = async () => {
    await fetch(`${BASE_URL}/api/v1/category/getAll`)
      .then((res) => res.json())
      .then((data) => setAllCats(data.categories));
  };
  useEffect(() => {
    loadCats();
  }, []);
  const [allCats, setAllCats] = useState([]);
  // const useStyles = makeStyles((theme) => DrawerStyle(theme));
  //const classes = useStyles();
  const closeDrawer = () => {
    dispatch({ type: HIDE_FILTER_DRAWER });
  };
  const [cost, setCost] = useState([0, 5000000]);
  const [currChip, setChip] = useState("");
  const isActive = (x) => {
    return currChip === x ? "success" : "primary";
  };
  const handleChange = (event, newValue, activeThumb) => {
    setCost(newValue);
  };
  const handleClick = (arg) => {
    setChip(arg);
    window.localStorage.setItem("category", arg);
    window.localStorage.setItem("page", 1);
    dispatch(getProdData(preserveURL()));
  };
  const handleSlider = () => {
    window.localStorage.setItem("cost", JSON.stringify(cost));
    dispatch(getProdData(preserveURL()));
    closeDrawer();
  };

  return (
    <Fragment>
      {show && (
        <div className="mainDiv" onClick={() => closeDrawer()}>
          <div className="sliderDiv">
            <Slider
              onChange={handleChange}
              onChangeCommitted={handleSlider}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => {
                return `₹ ${v}`;
              }}
              value={cost}
              max={5000000}
              min={0}
              step={100000}
              disableSwap
            />
          </div>
          <p className="costShowcase">
            ₹ {cost[0]} to ₹ {cost[1]}
          </p>
          <div className="catDiv">
            <Chip
              label="Any Type"
              onClick={() => handleClick("")}
              color={isActive("")}
            />
            {allCats.map((cat, idx) => (
              <Chip
                key={idx}
                sx={{ margin: "0 3px 10px 3px" }}
                label={cat.name}
                onClick={() => handleClick(cat._id)}
                color={isActive(cat._id)}
              />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}
