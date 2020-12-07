import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//dayjs import
// import dayjs from "dayjs";

//mui
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
// import NotificationsIcon from "@material-ui/icons/Notifications";
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

// import { Badge, MenuItem } from "@material-ui/core";
// import ChatIcon from "@material-ui/icons/Chat";
// import Star from "@material-ui/icons/Star";
// import FavoriteIcon from "@material-ui/icons/Favorite";

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

  //menu state
  // const [, setAnchorEl] = React.useState(null);

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

  //--------------------------------

  //menuOpen
  // function onMenuOpened() {
  //   let unreadNotificationsId = state.loggedUser.notifications
  //     .filter((not) => !not.read)
  //     .map((not) => not.id);

  //   const postData = async () => {
  //     try {
  //       const result = await axios.post(
  //         "https://socialmedia-server.herokuapp.com/markNotifications",
  //         {
  //           unreadNotificationId: unreadNotificationsId,
  //         }
  //       );

  //       // getLoggedUser();
  //       console.log("updatednotifications");
  //     } catch {
  //       console.log("something went wrong");
  //     }
  //   };

  //   postData();
  // }

  //getUser
  // function getLoggedUser() {
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get(
  //         "https://socialmedia-server.herokuapp.com/user"
  //       );
  //       dispatch({ type: "SET_USER", payload: result.data });
  //     } catch {
  //       console.log("something went wrong");
  //     }
  //   };

  //   fetchData();
  // }

  //---------------------------------
  // let notificationIcon;

  // if (
  //   state.loggedUser.notifications &&
  //   state.loggedUser.notifications.length > 0
  // ) {
  //   state.loggedUser.notifications.filter((not) => not.read === false).length >
  //   0
  //     ? (notificationIcon = (
  //         <Badge
  //           badgeContent={
  //             state.loggedUser.notifications.filter((not) => not.read === false)
  //               .length
  //           }
  //           color="secondary"
  //         >
  //           <NotificationsIcon />
  //         </Badge>
  //       ))
  //     : (notificationIcon = <NotificationsIcon />);
  // } else {
  //   notificationIcon = <NotificationsIcon />;
  // }

  // //notificationsMarkup
  // //
  // let notificationsMarkup =
  //   state.loggedUser.notifications &&
  //   state.loggedUser.notifications.length > 0 ? (
  //     state.loggedUser.notifications.map((not) => {
  //       let verb;
  //       if (not.type === "liked") {
  //         verb = "liked";
  //       } else if (not.type === "commented") {
  //         verb = "commented";
  //       } else if (not.type === "followed") {
  //         verb = "followed";
  //       }

  //       const time = dayjs(not.created_at).fromNow();
  //       const iconColor = not.read ? "primary" : "secondary";

  //       let icon;
  //       if (not.type === "liked") {
  //         icon = <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />;
  //       } else if (not.type === "commented") {
  //         icon = <ChatIcon color={iconColor} style={{ marginRight: 10 }} />;
  //       } else {
  //         icon = <Star color={iconColor} style={{ marginRight: 10 }} />;
  //       }

  //       //creates the 'return outPut' inside  the map() 'notificationsMarkup'
  //       let outPut;
  //       if (not.type === "liked") {
  //         outPut = (
  //           <MenuItem key={not.created_at} onClick={handleClose}>
  //             {icon}
  //             <Typography
  //               component={Link}
  //               color="primary"
  //               variant="body1"
  //               to={`/${not.recipient}/${not.tweetid}`}
  //             >
  //               {not.sender} {verb} your post {time}
  //             </Typography>
  //           </MenuItem>
  //         );
  //       } else if (not.type === "commented") {
  //         outPut = (
  //           <MenuItem key={not.created_at} onClick={handleClose}>
  //             {icon}
  //             <Typography
  //               component={Link}
  //               color="primary"
  //               variant="body1"
  //               to={`/${not.recipient}/${not.tweetid}`}
  //             >
  //               {not.sender} {verb} your post {time}
  //             </Typography>
  //           </MenuItem>
  //         );
  //       } else {
  //         outPut = (
  //           <MenuItem key={not.created_at} onClick={handleClose}>
  //             {icon}
  //             <Typography
  //               component={Link}
  //               color="primary"
  //               variant="body1"
  //               to={`/${not.sender}`}
  //             >
  //               {not.sender} {verb} you {time}
  //             </Typography>
  //           </MenuItem>
  //         );
  //       }
  //       return outPut;
  //     })
  //   ) : (
  //     <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
  //   );

  //--------------------------------------------------------------------
  let drawer;

  if (localStorage.jwt) {
    drawer = (
      <div>
        {/* <div className={classes.toolbar} className={drawer} /> */}
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
            to={`/${state.loggedUser.username}`}
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
                  primary={`Log out @${state.loggedUser.username}`}
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
              primary={state.loggedUser.username}
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
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>

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

          <Link
            to={`/${state.loggedUser.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
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
  }

  return <div className={classes.drawer}>{drawer}</div>;
}
