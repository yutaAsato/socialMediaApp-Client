import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Container } from "@material-ui/core";

//components
import { FollowButton } from "./FollowButton";

//=====================================

const useStyles = makeStyles((theme) => ({
  root: {
    height: "170px",
    width: "100%",
  },
  inline: {
    display: "inline",
  },
  listItemStyle: {
    maxWidth: "320px",
  },
}));

//=========================================

export function Relevant(props) {
  const classes = useStyles();

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //relevantUser- relies on state.url set to be same as user in TweetDetails
  React.useEffect(() => {
    //toggle loading
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/relevantUser",
          {
            relevantUsername: state.url[0].username,
          }
        );

        dispatch({ type: "SET_RELEVANT_USER", payload: result.data });

        //toggle loading
        setLoading(false);
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [state.url]);

  //
  function handleClick() {
    console.log("hello");
  }

  //url for profilepic
  const profilePic = `https://socialmedia-server.herokuapp.com/img/${
    state.url[0] && state.url[0].username
  }? ${Date.now()}`;

  //markup
  let markup = (
    <Card className={classes.root}>
      <List>
        <Typography
          component="span"
          variant="h5"
          className={classes.inline}
          color="textPrimary"
          style={{
            marginLeft: "55px",
            fontWeight: "bold",
          }}
        >
          {" "}
          Relevant people
        </Typography>
        <Divider variant="fullWidth" component="li" />

        <ListItem alignItems="flex-start" className={classes.listItemStyle}>
          <div style={{ paddingRight: "15px", paddingTop: "6px" }}>
            <Avatar component="span">
              <img
                src={profilePic ? profilePic : null}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Avatar>{" "}
          </div>
          <Link
            to={`/${state.relevantUser[0] && state.relevantUser[0].username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemText
              // className={classes.listItem}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    @{state.relevantUser[0] && state.relevantUser[0].username}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {state.relevantUser[0] && state.relevantUser[0].bio}
                  </Typography>
                </React.Fragment>
              }
            />
          </Link>
          <FollowButton />
        </ListItem>
      </List>
    </Card>
  );

  return <div>{!loading ? markup : null}</div>;
}
