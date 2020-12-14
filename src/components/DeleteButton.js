import React from "react";
import axios from "axios";
// import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

export function DeleteButton(props) {
  //from react-router-dom
  let history = useHistory();

  let postId;
  if (props.tweetId) {
    postId = props.tweetId;
  } else {
    postId = props.currentTweetId;
  }

  //props.tweetid is a map of the tweets on tweets.js,
  //likedPost() checks state.likes which holds ALL the likes from this user
  //from tweets.js tweets. e.g if this user has liked 2 tweets from all the tweets
  //on tweets.js then we have to find if there is a 'hit'
  function DeletePost() {
    const deletePost = async () => {
      try {
        await axios.post(
          `https://socialmedia-server.herokuapp.com/tweet/${postId}`
        );
        // dispatch({ type: "SET_USER", payload: result.data.user });
      } catch {
        console.log("something went wrong");
      }
    };

    deletePost();

    //reroute
    history.push("/");
  }

  const DeleteButton = (
    <Tooltip title="delete" onClick={DeletePost}>
      <IconButton>
        <DeleteOutlinedIcon />
      </IconButton>
    </Tooltip>
  );

  return DeleteButton;
}
