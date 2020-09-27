import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//components
import { Tweets } from "./Tweets";

//==========================================

export function HomeTweets() {
  //--contextAPI--------
  const [state, dispatch] = useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //followtweets
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios.post("http://localhost:3000/followTweets");

        dispatch({ type: "SET_TWEETS", payload: result.data.tweets });
        dispatch({ type: "SET_LIKES", payload: result.data.likes });

        setLoading(false);
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>{!loading ? <Tweets /> : null}</div>
  );
}
