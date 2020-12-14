import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

//components
import { FollowButton } from "./FollowButton";

//utils/hooks
import { useClient } from "../utils/api-client";

//query
import { useFollowUnfollow } from "../utils/updaters";
import { useRelevantUser } from "../utils/user";

//=====================================

const useStyles = makeStyles((theme) => ({
  root: {
    height: "170px",
    width: "100%",
    backgroundColor: "#f7f7f7",
  },
  inline: {
    display: "inline",
  },
  listItemStyle: {
    maxWidth: "320px",
  },
}));

//=========================================

export function Relevant({ userData, urlUser }) {
  const { data: relevantUser, isLoading } = useRelevantUser("relevantUser", {
    data: { relevantUsername: urlUser },
  });

  const classes = useStyles();
  const client = useClient();

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //markup
  let markup;
  if (relevantUser !== undefined) {
    markup = (
      <Card className={classes.root}>
        <List>
          <div style={{ paddingBottom: `10px` }}>
            <Typography
              component="span"
              variant="h5"
              className={classes.inline}
              color="textPrimary"
              style={{
                marginLeft: "80px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Relevant people
            </Typography>
          </div>

          <Divider variant="fullWidth" component="li" />

          <ListItem alignItems="flex-start" style={{ paddingTop: "10px" }}>
            <div style={{ paddingRight: "15px", paddingTop: "6px" }}>
              <Avatar component="span">
                <img
                  alt=""
                  src={`https://socialmedia-server.herokuapp.com/img/${urlUser}`}
                  style={{ width: "200%", objectFit: "fill" }}
                />
              </Avatar>{" "}
            </div>
            <Link
              to={`/${relevantUser.username}`}
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
                      @{relevantUser.username}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      // style={{ fontSize: "0.8rem" }}
                    >
                      {relevantUser.bio}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Link>
            {userData.user.username === urlUser ? null : (
              <FollowButton userData={userData} relevantUser={relevantUser} />
            )}
            {/* <FollowButton userData={userData} relevantUser={relevantUser} /> */}
          </ListItem>
        </List>
      </Card>
    );
  }

  return <div>{!loading ? markup : null}</div>;
}
