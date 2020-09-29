import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//mui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import IconButton from "@material-ui/core/IconButton";
import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//components
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import { DeleteButton } from "./DeleteButton";
import { Container, Box } from "@material-ui/core";

//==========================================

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    // height: "180px",
  },
  inline: {
    display: "inline",
  },
  content: {
    padding: 0,
    paddingLeft: 16,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));

export function Tweets() {
  const classes = useStyles();
  //--contextAPI--------
  const [state, dispatch] = useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //dayjs extesnsion plug
  dayjs.extend(relativeTime);

  //url for profilepic
  const profilePic = `https://socialmedia-server.herokuapp.com/img/${
    state.url[0] && state.url[0].username
  }? ${Date.now()}`;

  //sort tweets by created_at
  let orderedTweets;
  if (state.tweets[0]) {
    orderedTweets = state.tweets.sort(function compare(a, b) {
      var dateA = new Date(a.created_at);
      var dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  }

  //markup
  let tweetsMarkup;

  if (state.tweets[0]) {
    tweetsMarkup = orderedTweets.map((tweet) => (
      <Card className={classes.root} key={tweet.id}>
        <Link
          to={`/${tweet.username}/${tweet.id}`}
          style={{ textDecoration: "none", color: "black" }}
          key={tweet.id}
        >
          <CardHeader
            avatar={
              <Avatar component="span">
                <img
                  src={`https://socialmedia-server.herokuapp.com/img/${
                    tweet.username
                  }? ${Date.now()}`}
                  style={{ width: "150%", objectFit: "cover" }}
                />
              </Avatar>
            }
            // titleTypographyProps={{ color: "pink" }}
            title={
              <Typography style={{ display: "flex" }}>
                {tweet.username}
              </Typography>
            }
            subheader={
              <div style={{ display: "flex" }}>
                <Typography style={{ marginRight: 5 }}>
                  {` @${tweet.username}`} -{" "}
                </Typography>{" "}
                <Typography> {dayjs(tweet.created_at).fromNow()}</Typography>
              </div>
            }
          />

          <CardContent className={classes.content}>
            <React.Fragment>
              <Typography
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {tweet.content}
              </Typography>
            </React.Fragment>
          </CardContent>
        </Link>

        <CardActions>
          <React.Fragment>
            <Container
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "-20px",
              }}
            >
              <Box>
                {tweet.likescount}{" "}
                <LikeButton
                  tweetId={tweet.id}
                  key={tweet.id}
                  tweet={tweet}
                  tweetUsername={tweet.username}
                />
              </Box>

              <Box>
                {tweet.commentcount}
                <Comments />
              </Box>
            </Container>
          </React.Fragment>
        </CardActions>

        <Divider />
      </Card>
    ));
  } else {
  }

  return <div>{tweetsMarkup}</div>;
}
