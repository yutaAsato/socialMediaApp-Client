import React from "react";
import { useParams } from "react-router-dom";

//components
import { HomeTweets } from "./HomeTweets";
import { HomePostTweet } from "./HomePostTweet";
import { Card } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

//mui
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

//home=========================================
export function Home() {
  const paramsUser = useParams();

  console.log("HOME");
  return (
    <div style={{ paddingTop: "10px" }}>
      <Card>
        <Typography
          variant="h2"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            paddingLeft: "10px",
          }}
        >
          {"Home"}
          <IconButton style={{ paddingLeft: "450px" }}>
            <img
              alt=""
              src={require("../assets/svg/fighter.svg")}
              // src="https://icons.iconarchive.com/icons/3xhumed/mega-games-pack-27/256/Street-Fighter-II-2-icon.png"
              style={{ width: "50px" }}
            />
          </IconButton>
        </Typography>
      </Card>
      <Divider light={true} />
      <Card>
        <HomePostTweet />
      </Card>
      <HomeTweets />
    </div>
  );
}
