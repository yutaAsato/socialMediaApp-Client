import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

//query
import { usePostComment } from "../utils/updaters";
import { useUser } from "../utils/user";
import { useNotifications } from "../utils/notifications";

//----------------------

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    // display: "flex",
    width: "500px",
  },
}));

//==============================================================

export function Comments({ tweetId, tweetUsername }) {
  const loggedUser = useUser("user");

  const [postComment] = usePostComment(
    `tweet/${tweetUsername}/${tweetId}/${loggedUser.user.username}/comment`
  );

  const [postNotification] = useNotifications("notifications");
  //-------------------------------------------------------

  const classes = useStyles();

  //dayjs extesnsion plug
  dayjs.extend(relativeTime);

  //--contextAPI--------
  const [state] = React.useContext(UserContext);

  //local state
  const [open, setOpen] = React.useState(false);
  const [reply, setReply] = React.useState("");

  //eventHandlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleReply(e) {
    setReply(e.target.value);
  }

  //------------------------------------------

  //axios postreply
  // function handleComment() {
  //   const postReply = async () => {
  //     try {
  //       await axios.post(
  //         `https://socialmedia-server.herokuapp.com/tweet/${tweetUsername}/${tweetId}/${
  //           state.loggedUser && state.loggedUser.username
  //         }/comment`,
  //         {
  //           comment: reply,
  //         }
  //       );
  //       console.log("posted reply");
  //       postNotification();
  //     } catch {
  //       console.log("cannot post reply");
  //     }
  //   };
  //   postReply();
  //   handleClose();
  // }

  //postNotification
  // function postNotification() {
  //   const postData = async () => {
  //     try {
  //       await axios.post(
  //         "https://socialmedia-server.herokuapp.com/notifications",
  //         {
  //           sender: state.loggedUser.username,
  //           recipient: state.relevantUser[0].username,
  //           type: "commented",
  //           tweetId: tweetId,
  //         }
  //       );
  //       console.log("posted notifications");
  //     } catch {
  //       console.log("something went wrong");
  //     }
  //   };

  //   postData();
  // }

  //--------------------------------------
  let user = tweetUsername;
  let postId = tweetId;

  //url for profilepic
  const profilePic = `https://socialmedia-server.herokuapp.com/img/${
    loggedUser.user.username
  }? ${Date.now()}`;

  //filteredTweets
  let filteredTweets;
  if (state.url[0]) {
    loggedUser.user.username === tweetUsername
      ? (filteredTweets = state.userTweets.filter(
          (data) => data.id === parseInt(tweetId)
        ))
      : (filteredTweets = state.tweets.filter(
          (data) => data.id === parseInt(tweetId)
        ));
  }

  //markup
  let markup;
  if (state.url[0] && filteredTweets.length) {
    markup = (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar>
              <img
                alt=""
                src={`https://socialmedia-server.herokuapp.com/img/${
                  filteredTweets[0] && filteredTweets[0].username
                }? ${Date.now()}`}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Avatar>
          }
          title={filteredTweets[0].username}
          subheader={dayjs(state.tweets[0].created_at).fromNow()}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            {filteredTweets[0].content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    );
  }

  //-------------------------------------------------

  return (
    <>
      <IconButton aria-label="share" onClick={handleClickOpen}>
        <ChatIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>

        {markup}

        <DialogContent>
          <Avatar>
            <img
              alt=""
              src={profilePic ? profilePic : null}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Avatar>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            type="text"
            fullWidth
            placeholder="Tweet your reply"
            onChange={handleReply}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              postComment({
                comment: reply,
              });
              postNotification({
                sender: loggedUser.user.username,
                recipient: user,
                type: "commented",
                tweetId: postId,
              });
              handleClose();
            }}
            color="primary"
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
