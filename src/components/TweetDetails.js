import React from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//mui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

//components
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import { DeleteButton } from "./DeleteButton";
import { Box } from "@material-ui/core";

//lib
import { FullPageSpinner } from "../utils/lib";
import { Spinner } from "../utils/lib";

//query
import { useUser } from "../utils/user";
import { useTweets, useHomeTweets } from "../utils/tweets";
import { useComments } from "../utils/comments";
import { useImage } from "../utils/image";

//=========
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
//---------------------

export function TweetDetails(props) {
  const { username: urlUser, tweetId } = useParams();

  //query
  const data = useUser("user");
  const { user, relationships, notifications } = data;

  const { data: userTweets, isLoading } = useTweets("userTweets");

  const { data: followTweets } = useHomeTweets("followTweets");
  // const { tweets } = followTweets;

  const { data: comments, isFetchedAfterMount } = useComments(
    `comment/${urlUser}/${tweetId}`
  );

  const image = useImage(
    `https://socialmedia-server.herokuapp.com/img/${urlUser}`
  );
  //------------------------------

  const classes = useStyles();
  //dayjs extesnsion plug
  dayjs.extend(relativeTime);

  //===========================================

  //get tweetId from url
  const currentTweetId = props.match.params.tweetId;

  //get tweet username from url
  const currentTweetUsername = props.match.params.username;

  //filter the tweet in state-if the username in url matches the username in url state then filter userTweets not followTweet
  //NOTE= props.match.params.tweetId is a STRING number and NOT an integer so must use 'parseINT' to turn to integer or '===' will fail

  let tweetDetails;
  if (!isLoading && followTweets) {
    tweetDetails =
      user.username === urlUser
        ? userTweets.filter((data) => data.id === parseInt(tweetId))
        : followTweets.tweets.filter((data) => data.id === parseInt(tweetId));
  } else {
    return null;
  }

  //url for profilepic
  // const profilePic = `https://socialmedia-server.herokuapp.com/img/${urlUser}? ${Date.now()}`;

  console.log("Tweetdetials-tweetDetails", tweetDetails);
  // console.log("Tweetdetials-tweets", tweets);

  // markup;
  if (tweetDetails.length) {
    tweetDetails = (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar>
              <img
                alt=""
                src={`https://socialmedia-server.herokuapp.com/img/${urlUser}`}
                style={{ width: "200%", objectFit: "fill" }}
              />
            </Avatar>
          }
          title={`@${tweetDetails[0] && tweetDetails[0].username}`}
          subheader={dayjs(
            tweetDetails[0] && tweetDetails[0].created_at
          ).fromNow()}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            {tweetDetails[0] && tweetDetails[0].content}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Box style={{ paddingLeft: "20px" }}>
            {tweetDetails[0] && tweetDetails[0].likescount}
            <LikeButton
              tweetId={parseInt(currentTweetId)}
              tweetUsername={urlUser}
            />
          </Box>
          <Box>
            {tweetDetails[0] && tweetDetails[0].commentcount}
            <Comments
              tweetId={parseInt(currentTweetId)}
              tweetUsername={urlUser}
            />
          </Box>
          <Box>
            {currentTweetUsername === user.username ? (
              <DeleteButton currentTweetId={currentTweetId} />
            ) : null}
          </Box>
        </CardActions>
      </Card>
    );
  } else if (tweetId === undefined) {
    return (
      <div>
        <FullPageSpinner />
        {/* <h3>Sorry no tweet found</h3> */}
      </div>
    );
  } else {
    return (
      <div>
        <FullPageSpinner />
        {/* <h3>Sorry no tweet found</h3> */}
      </div>
    );
  }

  ///comments markup
  let commentSection;
  if (comments) {
    commentSection = comments.map((comment) => (
      <List className={classes.root} key={comment.id}>
        <Card style={{ backgroundColor: "#f7f7f7" }}>
          <ListItem alignItems="flex-start">
            <div style={{ paddingRight: "15px" }}>
              <Avatar component="span">
                <img
                  alt=""
                  src={`https://socialmedia-server.herokuapp.com/img/${comment.senderusername}`}
                  style={{ width: "200%", objectFit: "fill" }}
                />
              </Avatar>{" "}
            </div>
            <ListItemText
              primary={
                <Link
                  to={`/${comment.senderusername}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {`@${comment.senderusername}`}{" "}
                </Link>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2">
                    {"Replying to"}
                    <Link
                      to={`/${urlUser}`}
                      style={{ textDecoration: "none", color: "#87CEFA" }}
                    >
                      {" "}
                      {urlUser}{" "}
                    </Link>
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.comments}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body3"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {dayjs(comment.created_at).fromNow()}
                  </Typography>
                  <br />
                </React.Fragment>
              }
            />
          </ListItem>
        </Card>
      </List>
    ));
  } else {
    return (
      <div>
        <FullPageSpinner />
        {/* <h3>Sorry no tweet found</h3> */}
      </div>
    );
  }

  if (!tweetDetails) {
    return (
      <div>
        {/* <FullPageSpinner /> */}
        <h3>Sorry no tweet found</h3>
      </div>
    );
  }

  if (tweetDetails) {
    return (
      <>
        <div style={{ paddingTop: "10px" }}>{tweetDetails}</div>
        <div>{isFetchedAfterMount ? commentSection : <FullPageSpinner />}</div>
      </>
    );
  }
}
