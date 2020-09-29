import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useHistory, Link } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LocationIcon from "@material-ui/icons/LocationOnOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import IconButton from "@material-ui/core/IconButton";

//components
import { Tweets } from "./Tweets";
import { EditProfile } from "./EditProfile";
import { Container } from "@material-ui/core";

//------------

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 240,
    // backgroundSize: "contain",
  },
});

export function UserProfile(props) {
  const classes = useStyles();
  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //====================================================

  //sets url data to state so can access match.params in other componenents
  React.useEffect(() => {
    //loading
    setLoading(true);

    dispatch({ type: "URL_DATA", payload: props.match.params });
  }, [props.match.params.username]);

  //relevanttweets
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/relevantTweets",
          { relevantUsername: props.match.params.username }
        );
        //type = set_tweets to clear the tweets state with users tweets, on tweetdetails type is set_user_tweets
        dispatch({ type: "SET_TWEETS", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [props.match.params.username]);

  //user
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/user"
        );
        dispatch({ type: "SET_USER", payload: result.data });
        dispatch({
          type: "SET_RELATIONSHIPS",
          payload: result.data.relationships,
        });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [props.match.params.username]);

  //relevantUser- relies on state.url set to be same as user in TweetDetails
  React.useEffect(() => {
    //toggle loading state
    // setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/relevantUser",
          {
            relevantUsername: state.url[0].username,
          }
        );

        dispatch({ type: "SET_RELEVANT_USER", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [state.url[0]]);

  //relevantRelationships (gets followers and follow counts)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/relevantRelationships",
          {
            relevantUser: props.match.params.username,
          }
        );

        dispatch({ type: "SET_RELEVANT_RELATIONSHIPS", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };
    setLoading(false);

    fetchData();
  }, [props.match.params.username]);

  //=================================================================================================

  //editProfile button check-----
  let editDetailsButton;
  if (state.loggedUser && state.url[0]) {
    editDetailsButton =
      state.loggedUser.username === state.url[0].username ? (
        <EditProfile />
      ) : null;
  }

  //follower and follow check----------
  let followers;
  let following;
  if (state.relevantRelationships[0] && state.url[0]) {
    followers = state.relevantRelationships.filter(
      (x) => x.followed_username === state.url[0].username
    ).length;
    following = state.relevantRelationships.filter(
      (x) => x.followed_username !== state.url[0].username
    ).length;
  }

  ///---
  //url for profilepic
  const profilePic = `https://socialmedia-server.herokuapp.com/img/${
    state.url[0] && state.url[0].username
  }? ${Date.now()}`;

  //--------------------------------------

  //markup
  let markup = (
    <Card className={classes.root} key={state}>
      <CardActionArea>
        <CardMedia
          key={state}
          className={classes.media}
          // image={"https://socialmedia-server.herokuapp.com/img/bison"}
          image={`https://socialmedia-server.herokuapp.com/img/${
            state.url[0] && state.url[0].username
          }? ${Date.now()}`}
          title="user img"
        />
        <CardContent>
          <Container>{editDetailsButton}</Container>

          <Avatar component="span">
            <img
              src={profilePic ? profilePic : null}
              style={{ width: "150%", objectFit: "cover" }}
            />
          </Avatar>
          {/* <Avatar src={profilePic} /> */}
          <Typography gutterBottom variant="h5" component="h2">
            {state.relevantUser[0] && state.relevantUser[0].username}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {state.relevantUser[0] && state.relevantUser[0].bio}
          </Typography>

          <IconButton
            aria-label="location"
            style={{ paddingLeft: "0", marginLeft: "-5px" }}
            component="span"
          >
            <LocationIcon />
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ paddingLeft: "5px" }}
            >
              {state.relevantUser[0] && state.relevantUser[0].location}
            </Typography>
          </IconButton>
          <IconButton aria-label="joined" component="span">
            <DateIcon />
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ paddingLeft: "5px" }}
            >
              Joined{" "}
              {state.relevantUser[0] &&
                dayjs(state.relevantUser[0].created_at).format("DD/MM/YYYY")}
            </Typography>
          </IconButton>
          <br />
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ display: "inline-block" }}
          >
            {followers} {followers > 1 ? "Followers" : "Follower"}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ display: "inline-block", paddingLeft: "30px" }}
          >
            {following} Following
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
      <Container>{!loading ? <Tweets /> : null}</Container>
    </Card>
  );

  return (
    <div>
      {" "}
      <Container>
        <Typography variant="h4" style={{ paddingLeft: "30px" }}>
          {state.relevantUser[0] && state.relevantUser[0].username}
        </Typography>
        <Typography style={{ paddingLeft: "30px" }}>
          {state.tweets.length} {state.tweets.length > 1 ? "tweets" : "tweet"}
        </Typography>
      </Container>
      {!loading ? markup : null}
    </div>
  );
}
