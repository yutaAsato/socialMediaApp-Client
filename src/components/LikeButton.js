import React from "react";

//mui
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//query
import { useLike } from "../utils/updaters";
import { useHomeTweets } from "../utils/tweets";
import { useUser } from "../utils/user";
import { useNotifications } from "../utils/notifications";

//===========================================

export function LikeButton(props) {
  const loggedUser = useUser("user");
  const { data: followTweets } = useHomeTweets("followTweets");
  // const { likes } = followData;

  const [like] = useLike("tweet/:tweetId/like");
  const [unlike] = useLike("tweet/:tweetId/unlike");

  const [postNotification] = useNotifications("notifications");

  //-------------------------------------------------

  //props.tweetid is a map of the tweets on tweets.js,
  //likedPost() checks state.likes which holds ALL the likes from this user
  //from tweets.js tweets. e.g if this user has liked 2 tweets from all the tweets
  //on tweets.js then we have to find if there is a 'hit'
  function likedPost() {
    if (followTweets !== undefined) {
      if (!followTweets.likes.length) {
        return;
      }
      let result = followTweets.likes.map((data) =>
        data.tweetid === props.tweetId ? "liked" : null
      );
      if (result.find((x) => x === "liked")) {
        return true;
      }
    }
  }

  let user = props.tweetUsername;
  let postId = props.tweetId;

  //markup
  const likeButton = likedPost() ? (
    <Tooltip
      title="Undo like"
      onClick={() =>
        unlike({
          tweetId: props.tweetId,
        })
      }
    >
      <IconButton>
        <FavoriteIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip
      title="Like"
      onClick={() => {
        like({
          tweetId: props.tweetId,
        });
        postNotification({
          sender: loggedUser.user.username,
          recipient: user,
          type: "liked",
          tweetId: postId,
        });
      }}
    >
      <IconButton>
        <FavoriteBorder />
      </IconButton>
    </Tooltip>
  );

  return likeButton;
}
