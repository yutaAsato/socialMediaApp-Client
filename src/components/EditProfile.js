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
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//query
import { useUpload } from "../utils/uploadImage";
import { useEditDetails } from "../utils/updaters";

//------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  editProfile: {
    overflowY: "hidden",
    marginLeft: "100px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.5rem",
      marginLeft: "110px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "20px",
      fontSize: "0.4rem",
    },
  },
}));

//================================================

export function EditProfile({ user, image }) {
  const [uploadImage] = useUpload("upload");

  const [editDetails] = useEditDetails("editDetails");

  //===============================
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
    setBio(user.bio);
    setWebsite(user.website);
    setLocation(user.location);
  }, [user.bio, user.location, user.website]);

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

  function handleSubmitForm() {
    setOpen(false);
  }

  //opens hidden image input using tooltip
  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  //submit Image change
  function handleImageChange(event) {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    uploadImage(formData);
  }

  //------------------------

  return (
    <Container>
      <Button
        className={classes.editProfile}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ width: "200px" }}
        component="span"
      >
        <Typography style={{ fontWeight: 800, fontSize: "0.9rem" }}>
          Edit details
        </Typography>
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
                src={image}
                style={{ width: "150%", objectFit: "cover" }}
              />
            </Avatar>{" "}
            <input
              type="file"
              name="pic"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
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
            defaultValue={user.bio}
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
            defaultValue={user.location}
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
            defaultValue={user.website}
            style={{ paddingTop: "20px" }}
            onChange={handleWebsite}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              editDetails({
                bio: bio,
                website: website,
                location: location,
              });
              handleSubmitForm();
            }}
            color="primary"
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
