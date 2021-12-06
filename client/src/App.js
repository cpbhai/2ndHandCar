import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Design/Header/Header";
import Notify from "./components/Design/Notify";
import Home from "./components/Home/Home";
import Signup from "./components/Client/Signup";
import Login from "./components/Client/Login";
import Post from "./components/Client/Post/Post";
import { loadUser } from "./actions/userActions";
import store from "./store";
import { useSelector } from "react-redux";
import Loading from "./components/Design/Loading/Loading";
import MainDrawer from "./components/Design/MainDrawer/MainDrawer";
import FilterDrawer from "./components/Design/FilterDrawer/FilterDrawer";

function App() {
  const { loading } = useSelector((state) => state.auth);
  const { maindrawer, filterDrawer } = useSelector((state) => state.design);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <Loading show={loading} />
      <MainDrawer show={maindrawer} />
      <FilterDrawer show={filterDrawer} />
      <Notify />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create/post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
