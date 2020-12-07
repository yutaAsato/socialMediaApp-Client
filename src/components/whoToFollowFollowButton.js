import React from "react";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export function WtfFollowButton(props) {
  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //check if logged user is following this users profile, if yes color icon, no is black
  function followUser() {
    if (!state.relationships[0]) {
      return;
    }
    let following = state.relationships.map((data) =>
      data.followed_username === props.username ? "following" : null
    );

    if (following.find((x) => x === "following")) {
      return true;
    }
  }

  //unfollow
  function handleUnfollow() {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/unFollow",
          {
            toUnfollowUsername: props.username,
          }
        );
        dispatch({ type: "SET_RELATIONSHIPS", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }

  //follow
  function handleFollow() {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/follow",
          {
            toFollowUsername: props.username,
          }
        );
        dispatch({ type: "SET_RELATIONSHIPS", payload: result.data });
        postNotification();
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }

  //postNotification
  function postNotification() {
    const postData = async () => {
      try {
        await axios.post(
          "https://socialmedia-server.herokuapp.com/notifications",
          {
            sender: state.loggedUser.username,
            recipient: props.username,
            type: "followed",
          }
        );
        console.log("posted notifications");
      } catch {
        console.log("something went wrong");
      }
    };

    postData();
  }

  const followButton = followUser() ? (
    <Tooltip title="unfollow" onClick={handleUnfollow}>
      <IconButton>
        <img
          alt=""
          src={require("../assets/svg/color.svg")}
          style={{ width: "30px" }}
        />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="follow" onClick={handleFollow}>
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
