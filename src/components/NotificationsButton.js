import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//dayjs import
import dayjs from "dayjs";

//mui
import Hidden from "@material-ui/core/Hidden";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Badge, MenuItem } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import Star from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Menu } from "@material-ui/core";

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
  listItems: {
    [theme.breakpoints.down("md")]: {
      width: 0,
      display: "inline",
    },
  },
}));

///=========================================================

export function NotificationsButton() {
  const classes = useStyles();

  //menu state
  const [anchorEl, setAnchorEl] = React.useState(null);

  //--contextAPI--------
  const [state, dispatch] = useContext(UserContext);

  //--------------------------------

  //handleOpen
  function handleOpen(event) {
    setAnchorEl(event.target);
  }

  //handleClsoe
  function handleClose() {
    setAnchorEl(null);

    //call getUser to update marked notifications
    getLoggedUser();
  }

  //menuOpen
  function onMenuOpened() {
    let unreadNotificationsId = state.loggedUser.notifications
      .filter((not) => !not.read)
      .map((not) => not.id);

    const postData = async () => {
      try {
        await axios.post(
          "https://socialmedia-server.herokuapp.com/markNotifications",
          {
            unreadNotificationId: unreadNotificationsId,
          }
        );

        // getLoggedUser();
        console.log("updatednotifications");
      } catch {
        console.log("something went wrong");
      }
    };

    postData();
  }

  //getUser
  function getLoggedUser() {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/user"
        );
        dispatch({ type: "SET_USER", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }

  //---------------------------------

  // let orderedNotifications;
  // let orderedNotifications;
  // if (state.loggedUser) {
  //   orderedNotifications = state.loggedUser.notifications
  //     ? state.loggedUser.notifications.sort(function compare(a, b) {
  //         var dateA = new Date(a.created_at);
  //         var dateB = new Date(b.created_at);
  //         return dateB - dateA;
  //       })
  //     : null;
  // }
  // console.log(orderedNotifications);

  let notificationIcon;

  if (
    state.loggedUser.notifications &&
    state.loggedUser.notifications.length > 0
  ) {
    state.loggedUser.notifications.filter((not) => not.read === false).length >
    0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              state.loggedUser.notifications.filter((not) => not.read === false)
                .length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  //notificationsMarkup
  //
  let notificationsMarkup =
    state.loggedUser.notifications &&
    state.loggedUser.notifications.length > 0 ? (
      state.loggedUser.notifications.map((not) => {
        let verb;
        if (not.type === "liked") {
          verb = "liked";
        } else if (not.type === "commented") {
          verb = "commented";
        } else if (not.type === "followed") {
          verb = "followed";
        }

        const time = dayjs(not.created_at).fromNow();
        const iconColor = not.read ? "primary" : "secondary";

        let icon;
        if (not.type === "liked") {
          icon = <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />;
        } else if (not.type === "commented") {
          icon = <ChatIcon color={iconColor} style={{ marginRight: 10 }} />;
        } else {
          icon = <Star color={iconColor} style={{ marginRight: 10 }} />;
        }

        let outPut;
        if (not.type === "liked") {
          outPut = (
            <MenuItem key={not.created_at} onClick={handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/${not.recipient}/${not.tweetid}`}
              >
                {not.sender} {verb} your post {time}
              </Typography>
            </MenuItem>
          );
        } else if (not.type === "commented") {
          outPut = (
            <MenuItem key={not.created_at} onClick={handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/${not.recipient}/${not.tweetid}`}
              >
                {not.sender} {verb} your post {time}
              </Typography>
            </MenuItem>
          );
        } else {
          outPut = (
            <MenuItem key={not.created_at} onClick={handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/${not.sender}`}
              >
                {not.sender} {verb} you {time}
              </Typography>
            </MenuItem>
          );
        }
        return outPut;
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  //--------------------------------------------------------------------

  return (
    <ListItem button className={classes.listItems}>
      <ListItemIcon>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          style={{ marginLeft: "-12px" }}
        >
          {notificationIcon}
        </IconButton>
      </ListItemIcon>
      <Hidden mdDown>
        <ListItemText primary={"Notifications"} />
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </ListItem>
  );
}
