import React from "react";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export function LikeButton(props) {
  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //-------------------------------------------------

  //props.tweetid is a map of the tweets on tweets.js,
  //likedPost() checks state.likes which holds ALL the likes from this user
  //from tweets.js tweets. e.g if this user has liked 2 tweets from all the tweets
  //on tweets.js then we have to find if there is a 'hit'
  function likedPost() {
    if (!state.likes[0]) {
      return;
    }
    let result = state.likes.map((data) =>
      data.tweetid === props.tweetId ? "liked" : null
    );
    if (result.find((x) => x === "liked")) {
      return true;
    }
  }

  //unlikePost-calls 'followTweets' endpoint straight after to refresh the likes state.
  function unlikePost() {
    const fetchData = async () => {
      try {
        await axios.post("http://localhost:3000/tweet/:tweetId/unlike", {
          tweetId: props.tweetId,
        });
        const likes = await axios.post("http://localhost:3000/followTweets");
        dispatch({ type: "SET_LIKES", payload: likes.data.likes });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }

  //likePost
  function likePost() {
    const fetchData = async () => {
      try {
        await axios.post("http://localhost:3000/tweet/:tweetId/like", {
          tweetId: props.tweetId,
        });
        const likes = await axios.post("http://localhost:3000/followTweets");
        dispatch({ type: "SET_LIKES", payload: likes.data.likes });

        //
        postNotification();
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }

  let user;
  let postId;

  if (state.tweets[0]) {
    if (!window.location.pathname === "/") {
      user = state.relevantUser[0].username;
      postId = state.url[0] && state.url[0].tweetId;
    } else {
      user = props.tweetUsername;
      postId = props.tweetId;
    }
  }

  //postNotification
  function postNotification() {
    const postData = async () => {
      try {
        await axios.post("http://localhost:3000/notifications", {
          sender: state.loggedUser.username,
          recipient: user,
          type: "liked",
          tweetId: postId,
        });
        console.log("posted notifications");
      } catch {
        console.log("something went wrong");
      }
    };

    postData();
  }

  //--------------------------------------------

  //markup
  const likeButton = likedPost() ? (
    <Tooltip title="Undo like" onClick={unlikePost}>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like" onClick={likePost}>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
    </Tooltip>
  );

  return likeButton;
}
