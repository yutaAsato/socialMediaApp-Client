import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//mui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//utils/hooks/authprovider
import { useClient } from "../utils/api-client";
import { useAsync } from "../utils/hooks";
import { useAuth } from "../contextAPI/authProvider";

//====================

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: "red",
  },
}));

//------------------------------------
export function LogIn(props) {
  const classes = useStyles();
  let history = useHistory();
  let client = useClient();

  const { isLoading, isError, error, run } = useAsync();
  const { login, register } = useAuth();

  //local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //--contextAPI--------
  const [, dispatch] = useContext(UserContext);

  //redirect
  if (localStorage.jwt) {
    return <Redirect to="/" />;
  }

  //handlers
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //--------------------------
  //axios login
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    run(login(data));
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ paddingBottom: "200px" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={error?.errors.email ? true : false}
            helperText={error?.errors.email}
            onChange={handleEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error?.errors.password ? true : false}
            helperText={error?.errors.password}
            onChange={handlePassword}
          />
          <Grid container>
            <Grid>
              {error?.errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {error?.errors.general}
                </Typography>
              )}
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              {"Don't have an account?"}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
