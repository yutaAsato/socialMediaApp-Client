import React from "react";

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
  // console.log(useParams());

  return (
    <div style={{ paddingTop: "10px" }}>
      <Card>
        <Typography
          variant="h2"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            paddingLeft: "10px",
          }}
        >
          {"Home"}
          <IconButton style={{ paddingLeft: "450px" }}>
            <img
              alt=""
              src={require("../assets/svg/virus.svg")}
              style={{ width: "30px" }}
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
