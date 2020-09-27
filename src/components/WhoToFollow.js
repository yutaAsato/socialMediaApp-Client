import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

//components
import { WtfFollowButton } from "./whoToFollowFollowButton";

//=====================================

const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  mainCard: {
    height: "140px",
  },
}));

//=========================================

export function WhoToFollow(props) {
  const classes = useStyles();

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //markup
  let whoToFollow;
  if (state.whoToFollow[0]) {
    whoToFollow = state.whoToFollow.map((user, idx) => (
      <Card className={classes.mainCard} key={idx}>
        <List className={classes.root}>
          <Divider variant="fullWidth" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar component="span">
                <img
                  src={`http://localhost:3000/img/${
                    user.username
                  }? ${Date.now()}`}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Avatar>
            </ListItemAvatar>
            <Link to={`/${user.username}`} style={{ textDecoration: "none" }}>
              <ListItemText
                //   primary={state.relevantUser[0] && state.relevantUser[0].username}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      @{user.username}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {user.bio}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Link>
            <WtfFollowButton username={user.username} />
          </ListItem>
        </List>
      </Card>
    ));
  } else {
    return "nothing here";
  }

  return (
    <div>
      {!loading ? (
        <Card>
          <Typography
            component="span"
            variant="h5"
            className={classes.inline}
            color="textPrimary"
            style={{ marginLeft: "55px", fontWeight: "bold" }}
          >
            {" "}
            Who to follow
          </Typography>
          {whoToFollow}
        </Card>
      ) : null}
    </div>
  );
}
