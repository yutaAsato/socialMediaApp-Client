import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

//components
import { WtfFollowButton } from "./whoToFollowFollowButton";

//=====================================

const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  mainCard: {
    height: "140px",
  },
}));

//=========================================

export function WhoToFollow(props) {
  const classes = useStyles();

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading] = React.useState(false);

  //whoTofollow
  React.useEffect(() => {
    // setLoading(true);

    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/whoToFollow"
        );
        dispatch({
          type: "SET_WHO_TO_FOLLOW",
          payload: result.data,
        });

        //toggle loading state
        // setLoading(false);
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [dispatch, state.auth]);

  //markup
  let whoToFollow;
  if (state.whoToFollow[0]) {
    whoToFollow = state.whoToFollow.map((user, idx) => (
      <Card className={classes.mainCard} key={idx}>
        <List className={classes.root}>
          <Divider variant="fullWidth" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar component="span">
                <img
                  alt=""
                  src={`https://socialmedia-server.herokuapp.com/img/${
                    user.username
                  }? ${Date.now()}`}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Avatar>
            </ListItemAvatar>
            <Link to={`/${user.username}`} style={{ textDecoration: "none" }}>
              <ListItemText
                //   primary={state.relevantUser[0] && state.relevantUser[0].username}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      @{user.username}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {user.bio}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Link>
            <WtfFollowButton username={user.username} />
          </ListItem>
        </List>
      </Card>
    ));
  } else {
    return "nothing here";
  }

  return (
    <div>
      {!loading ? (
        <Card>
          <Typography
            component="span"
            variant="h5"
            className={classes.inline}
            color="textPrimary"
            style={{ marginLeft: "55px", fontWeight: "bold" }}
          >
            {" "}
            Who to follow
          </Typography>
          {whoToFollow}
        </Card>
      ) : null}
    </div>
  );
}
