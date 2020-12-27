import React from "react";
import { Link } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ExitIcon from "@material-ui/icons/ExitToAppOutlined";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import ProfileIcon from "@material-ui/icons/AccountCircleOutlined";

import { Box } from "@material-ui/core";

//component
import { NotificationsButton } from "./NotificationsButton";

//hooks
import { useUser } from "../utils/user";
import { useAuth } from "../contextAPI/authProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    // paddingLeft: "59px",
    // marginTop: "30px",
    // display: "flex",
    // justifyContent: "center,",
    // alignItems: "center",
    width: "100%",
    position: "fixed",
    bottom: 0,

    [theme.breakpoints.down("xs")]: {
      // paddingLeft: "30px",
    },
  },
  stickToBottom: {
    width: "100%",
    position: "sticky",
    bottom: 0,
  },
}));

//====================================================

export function NavigationBottom() {
  console.log("NavigationBottom");
  const classes = useStyles();

  const user = useAuth();
  const { data } = user;

  console.log("NavigationBottom", user);
  return (
    <BottomNavigation className={classes.root}>
      {data ? <AuthNavigationBottom /> : <UnauthNavigationBottom />}
    </BottomNavigation>
  );
}

//AuthNav==================================
function AuthNavigationBottom() {
  console.log("AuthNavBottom");
  const { login, register, logout } = useAuth();

  const loggedUser = useUser("user");
  const { user, relationships, notifications } = loggedUser;

  //--contextAPI--------
  const [state] = React.useContext(UserContext);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
      // showLabels
      className={classes.stickToBottom}
    >
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </Link>

      <Link
        to={`/${user.username}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
      </Link>
      <BottomNavigationAction
        style={{ paddingRight: "30px", paddingTop: "20px" }}
        label="Profile"
        icon={<NotificationsButton notifications={notifications} />}
      />
      <Link to={"/login"}>
        <BottomNavigationAction
          onClick={logout}
          style={{ paddingRight: "30px" }}
          label="logout"
          icon={<ExitIcon />}
        />
      </Link>
      <Link to={"/explore"}>
        <BottomNavigationAction
          style={{ paddingRight: "30px" }}
          label="logout"
          icon={<SearchOutlinedIcon />}
        />
      </Link>
    </BottomNavigation>
  );
}

//UnAuthNav=====================================
function UnauthNavigationBottom() {
  console.log("UnAuthNavBottom");
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.stickToBottom}>
      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <BottomNavigationAction label="login" icon={<VpnKeyOutlinedIcon />} />
      </Link>

      <Link to={`/register`} style={{ textDecoration: "none", color: "black" }}>
        <BottomNavigationAction
          label="register"
          icon={<HowToRegOutlinedIcon />}
        />
      </Link>
    </BottomNavigation>
  );
}
