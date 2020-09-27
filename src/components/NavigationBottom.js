import React from "react";
import { Link } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";

import ProfileIcon from "@material-ui/icons/AccountCircleOutlined";

import { Box } from "@material-ui/core";

//component
import { NotificationsButton } from "./NotificationsButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    // paddingLeft: "59px",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center,",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      // paddingLeft: "30px",
    },
  },
}));

export function NavigationBottom() {
  //--contextAPI--------
  const [state] = React.useContext(UserContext);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <Box display="flex">
        <Box m="auto">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          </Link>

          <Link
            to={`/${state.loggedUser.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
          </Link>
          <BottomNavigationAction
            style={{ paddingRight: "30px" }}
            label="Profile"
            icon={<NotificationsButton />}
          />
        </Box>
      </Box>
    </BottomNavigation>
  );
}
