import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//mui
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";

//components
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import { Container, Box } from "@material-ui/core";

//query
import { useImage } from "../utils/image";
//==========================================

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#f7f7f7",
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

//================================================================

export function Tweets({ data }) {
  //This was needed as the shape of incoming props is different from 'HomeTweets' and 'UserProfile'
  let tweets;
  if (data !== undefined) {
    if (data.tweets) {
      tweets = data.tweets;
    } else {
      tweets = data;
    }
  }

  //dayjs extesnsion plug
  dayjs.extend(relativeTime);

  //sort tweets by created_at
  let orderedTweets;
  if (tweets) {
    orderedTweets = tweets.sort(function compare(a, b) {
      var dateA = new Date(a.created_at);
      var dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  }

  let tweetsMarkup;

  if (tweets) {
    tweetsMarkup = orderedTweets.map((tweet) => (
      <TweetsCard key={tweet.id} tweet={tweet} />
    ));
  } else {
  }

  return <div>{tweetsMarkup}</div>;
}

//=============================================================

//TweetCard
function TweetsCard({ tweet }) {
  const classes = useStyles();

  // const image = useImage(
  //   `https://socialmedia-server.herokuapp.com/img/${tweet.username}`
  // );

  return (
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
                alt=""
                src={`https://socialmedia-server.herokuapp.com/img/${tweet.username}`}
                style={{ width: "200%", objectFit: "fill" }}
              />
            </Avatar>
          }
          title={
            <Typography style={{ display: "flex", fontSize: "1rem" }}>
              {tweet.username}
            </Typography>
          }
          subheader={
            <div style={{ display: "flex" }}>
              <Typography style={{ marginRight: 5, fontSize: "0.8rem" }}>
                {` @${tweet.username}`} -{" "}
              </Typography>{" "}
              <Typography style={{ fontSize: "0.8rem" }}>
                {" "}
                {dayjs(tweet.created_at).fromNow()}
              </Typography>
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
            <Box style={{ paddingLeft: "14px" }}>
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
              <Comments
                tweetId={tweet.id}
                key={tweet.id}
                tweet={tweet}
                tweetUsername={tweet.username}
              />
            </Box>
          </Container>
        </React.Fragment>
      </CardActions>

      <Divider />
    </Card>
  );
}
