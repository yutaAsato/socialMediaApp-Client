import React from "react";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

//----------------------

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    // display: "flex",
    width: "500px",
  },
}));

//----------------------------

export function PostTweet() {
  const classes = useStyles();

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local state
  const [open, setOpen] = React.useState(false);
  const [tweet, setTweet] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleTweet(e) {
    setTweet(e.target.value);
  }

  //axios postTweet
  function handlePostTweet() {
    const postTweet = async () => {
      try {
        const result = await axios.post("http://localhost:3000/postTweet", {
          content: tweet,
          urlUser: state.url[0] && state.url[0].username,
        });
        dispatch({ type: "SET_TWEETS", payload: result.data });
        console.log("posted tweet");
      } catch {
        console.log("cannot post tweet");
      }
    };

    postTweet();

    handleClose();
  }

  //url for profilepic
  const profilePic = `http://localhost:3000/img/${
    state.loggedUser && state.loggedUser.username
  }? ${Date.now()}`;

  //media query fro mui (button size)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const buttonProps = {
    variant: isSmallScreen ? "text" : "contained",
    size: isSmallScreen ? "small" : "large",
    startIcon: isSmallScreen ? <SendIcon /> : null,
  };
  //-----------------

  return (
    <div>
      <Button
        {...buttonProps}
        // variant="contained"
        // size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Post
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>

        <DialogContent>
          <Avatar>
            <img
              src={profilePic ? profilePic : null}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Avatar>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="text"
            type="text"
            fullWidth
            placeholder="What's on your mind?"
            onChange={handleTweet}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePostTweet} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
