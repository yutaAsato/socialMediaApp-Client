import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

//mui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
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

//------------------------------------

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
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

//--------------------------------------------------------------------------
export function Register(props) {
  const { isLoading, isError, error, run } = useAsync();
  const { login, register } = useAuth();

  const classes = useStyles();

  //local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  //errors
  const [errors, setErrors] = useState({
    errors: {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    },
  });

  //redirect
  if (localStorage.jwt) {
    return <Redirect to="/" />;
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  //register
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    run(register(data));

    // const registerUser = async () => {
    //   try {
    //     const result = await axios.post(
    //       "https://socialmedia-server.herokuapp.com/register",
    //       {
    //         email: email,
    //         username: username,
    //         password: password,
    //         confirmPassword: confirmPassword,
    //       }
    //     );
    //     const token = `Bearer ${result.data}`;
    //     localStorage.setItem("jwt", token);
    //     //redirects
    //     props.history.push("/");
    //   } catch (err) {
    //     setErrors(err.response.data);
    //   }
    // };

    // registerUser();
  };

  return (
    <Container component="main" maxWidth="xs" style={{ paddingBottom: "55px" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
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
            error={errors.errors.email ? true : false}
            helperText={errors.errors.email}
            onChange={handleEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={errors.errors.username ? true : false}
            helperText={errors.errors.username}
            onChange={handleUsername}
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
            error={errors.errors.password ? true : false}
            helperText={errors.errors.password}
            onChange={handlePassword}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Confirm password"
            label="Confirm Password"
            type="password"
            id="Confirm password"
            error={errors.errors.confirmPassword ? true : false}
            helperText={errors.errors.confirmPassword}
            onChange={handleConfirmPassword}
          />

          <Grid container alignItems="center">
            <Grid>
              {errors.errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.errors.general}
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
          <Grid container></Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
