import React, { useContext } from "react";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ExitIcon from "@material-ui/icons/ExitToAppOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import HowToRegOutlinedIcon from "@material-ui/icons/HowToRegOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";

//components
import { PostTweet } from "./PostTweet";
import { NotificationsButton } from "./NotificationsButton";

//query
import { useUser } from "../utils/user";

//utils/hooks/authprovider
import { useClient } from "../utils/api-client";
import { useAsync } from "../utils/hooks";
import { useAuth } from "../contextAPI/authProvider";
import { blue } from "@material-ui/core/colors";
import { Card } from "@material-ui/core";

//---------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    overflowY: "hidden",
    // width: theme.spacing(7) + 1,
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(8) + 1,
      overflowX: "hidden",
    },
  },
  postTweet: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  main: {
    paddingTop: "50px",
    background: "#fffdfd",
  },
  listText: {},
}));

///=========================================================

export function Navigations(props) {
  const user = useAuth();
  const { data } = user;

  //mui
  const theme = useTheme();
  console.log(theme);

  //effect
  React.useEffect(() => {
    if (!data) return () => <Redirect to="/login" />;
  }, [data]);

  return data ? <AuthenticatedNav /> : <UnauthenticatedNav />;
}

//============================================================

//AuthenticatedNav
function AuthenticatedNav() {
  console.log("authenticatedNAV");

  const { isLoading, isError, error, run } = useAsync();
  const { login, register, logout } = useAuth();

  const data = useUser("user");
  const { user, relationships, notifications } = data;

  const classes = useStyles();

  const matchProfile = useRouteMatch(`/${user?.username}`);
  const matchHome = useRouteMatch(`/`);

  console.log("matchHome", matchHome);
  console.log("matchProfile", matchProfile);
  let drawer = (
    <div style={{ paddingTop: "10px" }}>
      <Card>
        <List className={classes.main}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button selected={matchHome?.isExact ? true : false}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Hidden mdDown>
                <ListItemText
                  className={classes.listText}
                  primary={"Home"}
                ></ListItemText>
              </Hidden>
            </ListItem>
          </Link>

          <Link
            to={`/${user?.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button selected={matchProfile?.isExact ? true : false}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Hidden mdDown>
                <ListItemText
                  classes={{ label: classes.listText }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </Link>

          <NotificationsButton notifications={notifications} />

          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <Hidden mdDown>
                <ListItemText
                  className={classes.listText}
                  primary={`Log out @${user?.username}`}
                />
              </Hidden>
            </ListItem>
          </Link>

          <Divider />

          <ListItem className={classes.postTweet}>
            <PostTweet />
          </ListItem>

          <ListItem
            alignItems="flex-start"
            className={classes.NavProfile}
            style={{ paddingTop: "400px" }}
          >
            <ListItemAvatar>
              <Avatar component="span">
                <img
                  alt=""
                  src={`https://socialmedia-server.herokuapp.com/img/${
                    user && user.username
                  }? ${Date.now()}`}
                  style={{ width: "200%", objectFit: "fill" }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user?.username}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {/* {state.username} */}
                  </Typography>
                  @{user.username}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Card>
    </div>
  );
  return <div className={classes.drawer}>{drawer}</div>;
}

//=====================================================

//UnauthenticatedNav
function UnauthenticatedNav() {
  const classes = useStyles();

  let drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        </Link>

        <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <HowToRegOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Register"} />
          </ListItem>
        </Link>

        <Divider />
        <ListItem className={classes.postTweet}></ListItem>
        <ListItem alignItems="flex-start" className={classes.NavProfile}>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                ></Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
  return <div className={classes.drawer}>{drawer}</div>;
}
