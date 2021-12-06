import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MAIN_DRAWER } from "../../../constants/designConstants";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import DrawerStyle from "./DrawerStyle";

export default function MainDrawer({ show }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const useStyles = makeStyles((theme) => DrawerStyle(theme));
  const classes = useStyles();
  const closeDrawer = () => {
    dispatch({ type: HIDE_MAIN_DRAWER });
  };
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => closeDrawer()}>
      <List>
        <Link to="/" className="Link">
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <HomeIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Home" className={classes.text} />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/create/post" className="Link">
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <AddIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Post Car Details" className={classes.text} />
          </ListItem>
        </Link>
        {!isAuthenticated && (
          <>
            <Divider />
            <Link to="/signup" className="Link">
              <ListItem button className={classes.listItem}>
                <ListItemIcon>
                  <AppRegistrationIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Registration" className={classes.text} />
              </ListItem>
            </Link>
            <Link to="/login" className="Link">
              <ListItem button className={classes.listItem}>
                <ListItemIcon>
                  <LoginIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Log In" className={classes.text} />
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={show} onClose={() => closeDrawer()}>
      {list()}
    </Drawer>
  );
}
