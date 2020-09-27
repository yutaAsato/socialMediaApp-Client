import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

//components
import { LikeButton } from "./LikeButton";
import { Comments } from "./Comments";
import { DeleteButton } from "./DeleteButton";
import { Container, Box } from "@material-ui/core";

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
  // action: {
  //   display: "flex",
  //   justifyContent: "center",
  // },
}));
//---------------------

export function TweetDetails(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //--contextAPI--------
  const [state, dispatch] = useContext(UserContext);

  //dayjs extesnsion plug
  dayjs.extend(relativeTime);

  //=================================================

  const handleExpandClick = (props) => {
    setExpanded(!expanded);
  };

  //sets url data to state so can access match.params in other componenents
  useEffect(() => {
    dispatch({ type: "URL_DATA", payload: props.match.params });
  }, []);

  //relevantComments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/comment/${props.match.params.username}/${props.match.params.tweetId}`
        );

        dispatch({ type: "SET_RELEVANT_COMMENTS", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [state.tweets[0]]);

  //user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/user");

        dispatch({ type: "SET_USER", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  //followtweets and likes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post("http://localhost:3000/followTweets");
        dispatch({ type: "SET_TWEETS", payload: result.data.tweets });
        dispatch({ type: "SET_LIKES", payload: result.data.likes });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  //userTweets
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/userTweets");

        dispatch({ type: "SET_USER_TWEETS", payload: result.data });
        setLoading(false);
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  //===========================================

  //get tweetId from url
  const currentTweetId = props.match.params.tweetId;

  //get tweet username from url
  const currentTweetUsername = props.match.params.username;

  //filter the tweet in state-if the username in url matches the username in url state then filter userTweets not followTweet
  //NOTE= props.match.params.tweetId is a STRING number and NOT an integer so must use 'parseINT' to turn to integer or '===' will fail
  let filteredTweets;
  if (state.tweets[0]) {
    state.loggedUser.username === props.match.params.username
      ? (filteredTweets = state.userTweets.filter(
          (data) => data.id === parseInt(currentTweetId)
        ))
      : (filteredTweets = state.tweets.filter(
          (data) => data.id === parseInt(currentTweetId)
        ));
  }

  //url for profilepic
  const profilePic = `http://localhost:3000/img/${
    state.url[0] && state.url[0].username
  }? ${Date.now()}`;

  console.log(filteredTweets);

  //markup
  if (filteredTweets && filteredTweets.length) {
    filteredTweets = (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar>
              <img
                src={profilePic ? profilePic : null}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`@${filteredTweets[0] && filteredTweets[0].username}`}
          subheader={dayjs(
            filteredTweets[0] && filteredTweets[0].created_at
          ).fromNow()}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            {filteredTweets[0] && filteredTweets[0].content}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Box style={{ paddingLeft: "20px" }}>
            {filteredTweets[0] && filteredTweets[0].likescount}
            <LikeButton tweetId={parseInt(currentTweetId)} />
          </Box>
          <Box>
            {filteredTweets[0] && filteredTweets[0].commentcount}
            <Comments
              currentTweetId={currentTweetId}
              currentTweetUsername={currentTweetUsername}
            />
          </Box>
          <Box>
            {currentTweetUsername === state.loggedUser.username ? (
              <DeleteButton currentTweetId={currentTweetId} />
            ) : null}
          </Box>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <div>
        <h3>Sorry no tweet found</h3>
      </div>
    );
  }

  ///comments markup
  let commentMarkup;
  if (state.relevantComments[0]) {
    commentMarkup = state.relevantComments.map((comment) => (
      <List className={classes.root} key={comment.id}>
        <Card>
          <ListItem alignItems="flex-start">
            <div style={{ paddingRight: "15px" }}>
              <Avatar component="span">
                <img
                  src={`http://localhost:3000/img/${
                    comment.senderusername
                  }? ${Date.now()}`}
                  style={{ width: "150%", objectFit: "cover" }}
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
                  <Typography>
                    {"Replying to"}
                    <Link
                      to={`/${state.url[0] && state.url[0].username}`}
                      style={{ textDecoration: "none", color: "#87CEFA" }}
                    >
                      {` ${state.url[0] && state.url[0].username}`}{" "}
                    </Link>
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.comments}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
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
  }

  return (
    <>
      <div>{!loading ? filteredTweets : null}</div>
      <div>{!loading ? commentMarkup && commentMarkup : null}</div>
    </>
  );
}
