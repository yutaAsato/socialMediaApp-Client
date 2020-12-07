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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  editProfile: {
    overflowY: "hidden",
    marginLeft: "400px",
    [theme.breakpoints.down("md")]: {
      // width: theme.spacing(8) + 1,
      marginLeft: "130px",
      fontSize: "0.5rem",
    },
  },
}));

export function EditProfile(props) {
  //mui
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local state form
  const [bio, setBio] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [location, setLocation] = React.useState("");

  //open dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  //close dialogue box
  const handleClose = () => {
    setOpen(false);
  };

  //set default values to state, if not form will overwrite previous if not input
  React.useEffect(() => {
    setBio(state.loggedUser.bio);
    setWebsite(state.loggedUser.website);
    setLocation(state.loggedUser.location);
  }, [
    state.loggedUser.bio,
    state.loggedUser.location,
    state.loggedUser.website,
  ]);

  //editDetails
  function handleSubmitForm() {
    setOpen(false);

    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/editDetails",
          {
            bio: bio,
            website: website,
            location: location,
          }
        );

        dispatch({ type: "SET_USER", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();

    //relevantuser state needs to update after so UserProfile has access to new userDetails
    const fetchRelevant = async () => {
      try {
        const result = await axios.post(
          "https://socialmedia-server.herokuapp.com/relevantUser",
          {
            relevantUsername: state.url[0].username,
          }
        );

        dispatch({ type: "SET_RELEVANT_USER", payload: result.data });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchRelevant();
  }

  //event handlers--------

  //handleBio
  function handleBio(event) {
    setBio(event.target.value);
  }
  //handleBio
  function handleWebsite(event) {
    setWebsite(event.target.value);
  }
  //handleBio
  function handleLocation(event) {
    setLocation(event.target.value);
  }

  //IMAGE HANDLERS`

  //opens hidden image input using tooltip
  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  //submit Image change
  function handleSubmitChange(event) {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    //upload image
    const uploadImage = async () => {
      try {
        await axios.post(
          "https://socialmedia-server.herokuapp.com/upload",
          formData
        );

        dispatch({
          type: "SET_RELEVANT_USER_IMAGE",
          payload: `https://socialmedia-server.herokuapp.com/img/${
            state.url[0] && state.url[0].username
          }`,
        });
      } catch {
        console.log("something went wrong");
      }
    };

    uploadImage();
  }

  //url for profilepic
  const profilePic = `https://socialmedia-server.herokuapp.com/img/${
    state.url[0] && state.url[0].username
  }? ${Date.now()}`;

  //------------------------

  return (
    <Container>
      <Button
        className={classes.editProfile}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        // style={{ marginLeft: "400px" }}
        component="span"
      >
        Edit details
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
        <DialogContent>
          <div className="image-wrapper">
            <Avatar component="span">
              <img
                alt=""
                src={profilePic ? profilePic : null}
                style={{ width: "150%", objectFit: "cover" }}
              />
            </Avatar>{" "}
            <input
              type="file"
              name="pic"
              id="imageInput"
              hidden="hidden"
              onChange={handleSubmitChange}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton
                onClick={handleEditPicture}
                className="button"
                component="span"
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="bio"
            label="Bio"
            type="email"
            fullWidth
            defaultValue={state.loggedUser.bio}
            style={{ paddingTop: "20px" }}
            onChange={handleBio}
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            defaultValue={state.loggedUser.location}
            style={{ paddingTop: "20px" }}
            onChange={handleLocation}
          />
          <TextField
            autoFocus
            margin="dense"
            id="website"
            label="Website"
            type="text"
            fullWidth
            defaultValue={state.loggedUser.website}
            style={{ paddingTop: "20px" }}
            onChange={handleWebsite}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
