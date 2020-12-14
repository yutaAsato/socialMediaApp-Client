import React from "react";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

//query
import { usePostTweet } from "../utils/updaters";
import { useUser } from "../utils/user";

//----------------------

export function PostTweet() {
  const [postTweet] = usePostTweet("postTweet");
  const loggedUser = useUser("user");

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

  //url for profilepic
  const profilePic = `https://socialmedia-server.herokuapp.com/img/${loggedUser.user.username}`;

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
              alt=""
              src={profilePic ? profilePic : null}
              style={{ width: "200%", objectFit: "fill" }}
            />
          </Avatar>

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
          <Button
            onClick={() => {
              postTweet({
                content: tweet,
                urlUser: loggedUser.user.username,
              });
              handleClose();
            }}
            color="primary"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
