import React from "react";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//query
import { useFollowUnfollow } from "../utils/updaters";
import { useNotifications } from "../utils/notifications";

//============================================

export function WtfFollowButton({ userData, ...props }) {
  const [follow] = useFollowUnfollow("follow");
  const [unFollow] = useFollowUnfollow("unFollow");
  const [postNotification] = useNotifications("notifications");

  console.log("WhoToFollowButton", userData);

  //check if logged user is following this users profile, if yes color icon, no is black
  function followUser() {
    if (!userData.relationships) {
      return;
    }
    let following = userData.relationships.map((data) =>
      data.followed_username === props.username ? "following" : null
    );

    if (following.find((x) => x === "following")) {
      return true;
    }
  }

  const followButton = followUser() ? (
    <Tooltip
      title="unfollow"
      onClick={() => {
        unFollow({
          toUnfollowUsername: props.username,
        });
      }}
    >
      <IconButton>
        <img
          alt=""
          src={require("../assets/svg/color.svg")}
          style={{ width: "30px" }}
        />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip
      title="follow"
      onClick={() => {
        follow({
          toFollowUsername: props.username,
        });
        postNotification({
          sender: userData.user.username,
          recipient: props.username,
          type: "followed",
        });
      }}
    >
      <IconButton>
        <img
          alt=""
          src={require("../assets/svg/black.svg")}
          style={{ width: "30px" }}
        />
      </IconButton>
    </Tooltip>
  );

  return <div>{followButton}</div>;
}
