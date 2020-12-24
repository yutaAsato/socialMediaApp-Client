import React from "react";
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LocationIcon from "@material-ui/icons/LocationOnOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import IconButton from "@material-ui/core/IconButton";

//components
import { Tweets } from "./Tweets";
import { EditProfile } from "./EditProfile";
import { Container } from "@material-ui/core";

//utils/hooks
import { useClient } from "../utils/api-client";

//query
import { useImage } from "../utils/image";
import { useTweets } from "../utils/tweets";
import { useRelevantUser } from "../utils/user";
import { useUser } from "../utils/user";
import { FullPageSpinner } from "../utils/lib";
//--------------------------------------------------------

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 240,
    // backgroundSize: "contain",
  },
});

//UserProfile=================================================
export function UserProfile(props) {
  console.log("UserProfile");
  const { username: urlUser } = useParams();

  const client = useClient();

  const user = useUser("user");
  const { user: currentUser } = user;

  const { data: relevantTweets } = useTweets("relevantTweets", {
    data: { relevantUsername: props.match.params.username },
  });

  const { data: relevantUser, isLoading, isFetching } = useRelevantUser(
    "relevantUser",
    {
      data: { relevantUsername: urlUser },
    }
  );

  const { data: relationshipData } = useRelevantUser("relevantRelationships", {
    data: { relevantUser: props.match.params.username },
  });

  //image
  const image = useImage(
    `https://socialmedia-server.herokuapp.com/img/${urlUser}`
  );

  //-----------------------------------------------

  const classes = useStyles();
  //--contextAPI--------
  const [state] = React.useContext(UserContext);

  //====================================

  //editProfile button check-----
  let editDetailsButton =
    currentUser.username === urlUser ? (
      <EditProfile user={currentUser} image={image} />
    ) : null;

  //follower and follow check----------
  let followers;
  let following;

  if (relationshipData) {
    followers = relationshipData.filter((x) => x.followed_username === urlUser)
      .length;
    following = relationshipData.filter((x) => x.followed_username !== urlUser)
      .length;
  }

  //--------------------------------------

  //markup
  let markup;
  if (relevantUser !== undefined && !isLoading) {
    markup = (
      <Card className={classes.root} key={state}>
        <CardActionArea>
          <CardMedia
            key={state}
            className={classes.media}
            image={`https://socialmedia-server.herokuapp.com/img/${relevantUser.username}`}
            title="user img"
          />
          <CardContent>
            <Container>{editDetailsButton}</Container>

            <Avatar component="span">
              <img
                alt=""
                src={`https://socialmedia-server.herokuapp.com/img/${relevantUser.username}`}
                style={{ width: "200%", objectFit: "fill" }}
              />
            </Avatar>
            {/* <Avatar src={profilePic} /> */}
            <Typography gutterBottom variant="h5" component="h2">
              {relevantUser.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {relevantUser.bio}
            </Typography>

            <IconButton
              aria-label="location"
              style={{ paddingLeft: "0", marginLeft: "-5px" }}
              component="span"
            >
              <LocationIcon />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ paddingLeft: "5px" }}
              >
                {relevantUser.location}
              </Typography>
            </IconButton>
            <IconButton aria-label="joined" component="span">
              <DateIcon />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ paddingLeft: "5px" }}
              >
                Joined {dayjs(relevantUser.created_at).format("DD/MM/YYYY")}
              </Typography>
            </IconButton>
            <br />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ display: "inline-block" }}
            >
              {followers} {followers > 1 ? "Followers" : "Follower"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ display: "inline-block", paddingLeft: "30px" }}
            >
              {following} Following
            </Typography>
          </CardContent>
        </CardActionArea>

        <div>{<Tweets data={relevantTweets} />}</div>
      </Card>
    );
  } else {
    markup = <FullPageSpinner />;
  }

  return (
    <div>
      {!isFetching && relevantTweets ? (
        <Container>
          <Typography variant="h4" style={{ paddingLeft: "10px" }}>
            {relevantUser?.username}
          </Typography>
          <Typography style={{ paddingLeft: "10px" }}>
            {relevantTweets?.length}{" "}
            {relevantTweets?.length > 1 ? "tweets" : "tweet"}
          </Typography>
          {markup}
        </Container>
      ) : (
        <FullPageSpinner />
      )}
    </div>
  );
}
