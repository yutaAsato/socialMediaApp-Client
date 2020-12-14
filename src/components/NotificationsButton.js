import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
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

//query
import { useUser } from "../utils/user";
import { useRelevantUser } from "../utils/user";
import { useMarkNotification } from "../utils/updaters";
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
  listText: {
    // color: "blue",
  },
}));

///=========================================================

export function NotificationsButton({ notifications }) {
  const [markNotifications] = useMarkNotification("markNotifications");

  console.log("Notification Button");

  //--------------------------------
  const classes = useStyles();
  //menu state
  const [anchorEl, setAnchorEl] = React.useState(null);

  //handleOpen
  function handleOpen(event) {
    setAnchorEl(event.target);
  }

  //handleClsoe
  function handleClose() {
    setAnchorEl(null);
  }

  //menuOpen
  function onMenuOpened() {
    let unreadNotificationsId = notifications
      .filter((not) => !not.read)
      .map((not) => not.id);

    return unreadNotificationsId;
  }

  let notificationIcon;

  if (notifications.length) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
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

  let notificationsMarkup;
  if (notifications.length) {
    notificationsMarkup = notifications.map((not) => {
      let verb;
      if (not.type === "liked") {
        verb = "liked";
      } else if (not.type === "commented") {
        verb = "commented";
      } else if (not.type === "followed") {
        verb = "followed";
      }

      // const time = dayjs(not.created_at).fromNow();
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
          <Link to={`/${not.recipient}/${not.tweetid}`} key={not.created_at}>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              {icon}
              <Typography
                key={not.created_at}
                component={Link}
                color="primary"
                variant="body1"
                to={`/${not.recipient}/${not.tweetid}`}
              >
                {not.sender} {verb} your post
                {/* {not.sender} {verb} your post {time} */}
              </Typography>
            </MenuItem>
          </Link>
        );
      } else if (not.type === "commented") {
        outPut = (
          <Link to={`/${not.recipient}/${not.tweetid}`} key={not.created_at}>
            <MenuItem onClick={handleClose}>
              {icon}
              <Typography
                key={not.created_at}
                component={Link}
                color="primary"
                variant="body1"
                to={`/${not.recipient}/${not.tweetid}`}
              >
                {not.sender} {verb} your post
                {/* {not.sender} {verb} your post {time} */}
              </Typography>
            </MenuItem>
          </Link>
        );
      } else {
        outPut = (
          <MenuItem onClick={handleClose}>
            {icon}
            <Link to={`/${not.sender}`} key={not.created_at}>
              <Typography
                key={not.created_at}
                component={Link}
                color="primary"
                variant="body1"
                to={`/${not.sender}`}
              >
                {not.sender} {verb} you
                {/* {not.sender} {verb} you {time} */}
              </Typography>
            </Link>
          </MenuItem>
        );
      }
      return outPut;
    });
  } else {
    notificationsMarkup = (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  }

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
        <ListItemText className={classes.listText} primary={"Notifications"} />
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={() =>
          markNotifications({ unreadNotificationId: onMenuOpened() })
        }
      >
        {notificationsMarkup}
      </Menu>
    </ListItem>
  );
}
