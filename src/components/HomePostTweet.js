import React from "react";
import axios from "axios";

//mui
import Avatar from "@material-ui/core/Avatar";
import { Container, ListItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

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

export function HomePostTweet() {
  const classes = useStyles();

  //context
  const [state, dispatch] = React.useContext(UserContext);

  //local
  const [tweet, setTweet] = React.useState("");

  //set tweet state
  function handleTweet(e) {
    setTweet(e.target.value);
  }

  //axios postTweet
  function handlePostTweet() {
    const postTweet = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/postTweet",
          {
            content: tweet,
          }
        );
        console.log("posted tweet");
      } catch {
        console.log("cannot post tweet");
      }
    };

    postTweet();
    handleClear();
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
              src={`https://socialmedia-server.herokuapp.com/img/${
                state.loggedUser && state.loggedUser.username
              }? ${Date.now()}`}
              style={{ width: "150%", objectFit: "cover" }}
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
              onClick={handlePostTweet}
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
