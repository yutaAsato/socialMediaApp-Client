import React from "react";
import { Link } from "react-router-dom";

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

//query
import { useWhoToFollow } from "../utils/user";
import { FullPageSpinner } from "../utils/lib";

//=====================================

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "350px",
    // maxWidth: "100%",
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#f7f7f7",
  },
  inline: {
    display: "inline",
    backgroundColor: "#f7f7f7",
  },
  mainCard: {
    height: "140px",
    backgroundColor: "#f7f7f7",
  },
  container: { backgroundColor: "#f7f7f7", width: "350px" },
}));

//=========================================

export function WhoToFollow({ userData }) {
  const { data: whoToFollows, isLoading, isFetching } = useWhoToFollow(
    "whoToFollow"
  );
  console.log("WhoToFollow", whoToFollows);

  const classes = useStyles();

  //local (prevent dom loading until state updated)
  const [loading] = React.useState(false);

  //markup
  let whoToFollow;
  if (whoToFollows && !isFetching) {
    whoToFollow = whoToFollows.map((user, idx) => (
      <Card className={classes.mainCard} key={idx}>
        <List className={classes.root}>
          <Divider variant="fullWidth" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar component="span">
                <img
                  alt=""
                  src={`https://socialmedia-server.herokuapp.com/img/${
                    user.username
                  }? ${Date.now()}`}
                  style={{ width: "200%", objectFit: "fill" }}
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
            <WtfFollowButton username={user.username} userData={userData} />
          </ListItem>
        </List>
      </Card>
    ));
  } else {
    return (
      <div>
        {" "}
        <FullPageSpinner />
      </div>
    );
  }

  return (
    <div>
      {!loading ? (
        <Card className={classes.container}>
          <Typography
            component="span"
            variant="h5"
            className={classes.inline}
            color="textPrimary"
            style={{
              marginLeft: "90px",
              fontWeight: "bold",
            }}
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
