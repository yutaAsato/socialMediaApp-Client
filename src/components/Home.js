import React, { useEffect, useContext } from "react";
import axios from "axios";

//components
import { Tweets } from "./Tweets";
import { HomeTweets } from "./HomeTweets";
import { SideBar } from "./SideBar";
import { HomePostTweet } from "./HomePostTweet";
import { Card } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

//mui
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

//muistyle
import { makeStyles } from "@material-ui/core/styles";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//=====mui styles===============
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

//home=========================================
export function Home() {
  const classes = useStyles();

  //context
  const [state, dispatch] = useContext(UserContext);

  //user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/user"
        );
        dispatch({ type: "SET_USER", payload: result.data });
        dispatch({
          type: "SET_RELATIONSHIPS",
          payload: result.data.relationships,
        });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  //reset state.url to null so <SideBar/> can render different components
  useEffect(() => {
    dispatch({ type: "URL_DATA", payload: null });
  }, []);

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
