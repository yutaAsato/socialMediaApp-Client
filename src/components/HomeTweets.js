import React from "react";

//components
import { Tweets } from "./Tweets";

//query
import { useHomeTweets } from "../utils/tweets";

//==========================================

export function HomeTweets() {
  const { data, isLoading } = useHomeTweets("followTweets");

  if (data !== undefined) {
    return (
      <div style={{ paddingTop: "10px" }}>{<Tweets data={data.tweets} />}</div>
    );
  } else {
    return null;
  }
}
