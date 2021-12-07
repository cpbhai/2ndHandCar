import { useEffect, Fragment } from "react";
import { getProdData, clearErrors } from "../../actions/postActions";
import {
  SHOW_FILTER_DRAWER,
  HIDE_FILTER_DRAWER,
} from "../../constants/designConstants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SendNotif from "../../utils/SendNotif";
import Loading from "../../components/Design/Loading/Loading";
import ProductCard from "../Product/ProductCard/ProductCard";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import preserveURL from "../../utils/preserveURL";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, postData, totalPages, page } = useSelector(
    (state) => state.post
  );
  const { filterDrawer } = useSelector((state) => state.design);
  useEffect(() => {
    if (!postData) {
      dispatch(getProdData(""));
      window.localStorage.clear();
    }
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
      navigate("/login");
    }
  }, [dispatch, error, navigate, postData]);

  const handleFilterDrawer = () => {
    if (filterDrawer) dispatch({ type: HIDE_FILTER_DRAWER });
    else dispatch({ type: SHOW_FILTER_DRAWER });
  };
  const handlePage = (pg) => {
    window.localStorage.setItem("page", pg);
    dispatch(getProdData(preserveURL()));
  };
  return (
    <Fragment>
      <Loading show={loading} />
      <Button
        onClick={handleFilterDrawer}
        sx={{
          position: "fixed",
          zIndex: "1",
        }}
        color={filterDrawer ? "error" : "info"}
        variant="contained"
        startIcon={filterDrawer ? <CloseIcon /> : <FilterAltIcon />}
      >
        {filterDrawer ? "Close" : "Filter"}
      </Button>

      <div className="homeHeight"></div>
      <Grid
        container
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "25px 0",
        }}
        gap={2}
      >
        {postData && postData.length !== 0 ? (
          postData.map((post, idx) => <ProductCard itm={post} key={idx} />)
        ) : (
          <h2>No matching cars found:(</h2>
        )}
      </Grid>
      {totalPages ? (
        <div className="paginate">
          <Pagination
            count={totalPages}
            color="secondary"
            page={page}
            size="small"
            onChange={(e, v) => handlePage(v)}
            showFirstButton
            showLastButton
          />
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default Home;
