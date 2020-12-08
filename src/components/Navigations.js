import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
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

//components
import { PostTweet } from "./PostTweet";
import { NotificationsButton } from "./NotificationsButton";

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
}));

///=========================================================

export function Navigations(props) {
  const classes = useStyles();

  //--contextAPI--------
  const [state, dispatch] = useContext(UserContext);

  //--------

  React.useEffect(() => {
    if (!localStorage.jwt) return () => <Redirect to="/login" />;
  });

  //logout
  function handlelogOut() {
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "SET_AUTH", payload: false });
    dispatch({ type: "LOG_OUT" });
  }

  //--------------------------------------------------------------------
  let drawer;

  if (state.loggedUser) {
    drawer = (
      <div>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Hidden mdDown>
                <ListItemText primary={"Home"} />
              </Hidden>
            </ListItem>
          </Link>

          <Link
            to={`/${state.loggedUser?.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <Hidden mdDown>
                <ListItemText primary={"Profile"} />
              </Hidden>
            </ListItem>
          </Link>

          <NotificationsButton />

          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button onClick={handlelogOut}>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <Hidden mdDown>
                <ListItemText
                  primary={`Log out @${state.loggedUser?.username}`}
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
                    state.loggedUser && state.loggedUser.username
                  }? ${Date.now()}`}
                  style={{ width: "150%", objectFit: "cover" }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={state.loggedUser?.username}
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
                  @{state.loggedUser.username}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    );
  } else {
    drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link> */}

          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          </Link>

          <Link
            to="/register"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Register"} />
            </ListItem>
          </Link>
          {/* 
          <Link
            to={`/${state.loggedUser?.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          </Link> */}

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
  }

  return <div className={classes.drawer}>{drawer}</div>;
}
