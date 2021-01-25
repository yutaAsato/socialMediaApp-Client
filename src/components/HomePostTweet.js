import React from "react";

//mui
import Avatar from "@material-ui/core/Avatar";
import { Container, ListItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//query
import { usePostTweet } from "../utils/updaters";
import { useUser } from "../utils/user";

//===========================================

const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {
      main: "red",
    },
  },
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    height: "100px",
  },
  textField: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  postButton: {
    marginRight: "-390px",
    marginTop: "40px",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      // width: theme.spacing(8) + 1,
      marginLeft: "-100px",
      marginBottom: "-10px",
      height: "20px",
      fontSize: "0.5rem",
    },
    [theme.breakpoints.down("md")]: {
      // width: theme.spacing(8) + 1,
      marginRight: "-300px",
      fontSize: "0.5rem",
    },
  },
}));

//========================================

export function HomePostTweet() {
  const [postTweet] = usePostTweet("postTweet");
  const loggedUser = useUser("user");

  console.log(loggedUser);

  //--------------------------------
  const classes = useStyles();

  //context
  const [state] = React.useContext(UserContext);

  //local
  const [tweet, setTweet] = React.useState("");

  //set tweet state
  function handleTweet(e) {
    setTweet(e.target.value);
  }

  function handleClear() {
    setTweet("");
  }

  return (
    <div className={classes.root}>
      <Container style={{ marginLeft: "-24px" }}>
        <ListItem>
          <Avatar component="span">
            <img
              alt=""
              src={`https://socialmedia-server.herokuapp.com/img/${loggedUser.user.username}`}
              style={{ width: "200%", objectFit: "cover" }}
            />
          </Avatar>
          <TextField
            id="standard-full-width"
            style={{ margin: 10 }}
            placeholder="What's happening?"
            fullWidth
            value={tweet}
            onChange={handleTweet}
          />
          <Container
            className={classes.postButton}
            // style={{
            //   marginRight: "-390px",
            //   marginTop: "40px",
            //   padding: "10px",
            // }}
          >
            <Button
              onClick={() => {
                postTweet({
                  content: tweet,
                });
                handleClear();
              }}
              color="primary"
              //   style={{ color: "#87CEFA" }}
              variant="contained"
            >
              Post
            </Button>
          </Container>
        </ListItem>
      </Container>
    </div>
  );
}
