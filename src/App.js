import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//contextAPI
import { UserContext } from "./contextAPI/userContext";

//components
import { Home } from "./components/Home";
import { LogIn } from "./components/Login";
import { TweetDetails } from "./components/TweetDetails";
import { Navigations } from "./components/Navigations";
import { UserProfile } from "./components/UserProfile";
import { SideBar } from "./components/SideBar";
import { Register } from "./components/Register";
import { NavigationBottom } from "./components/NavigationBottom";

//mui
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

//==========================================================

function App() {
  if (localStorage.jwt) {
    axios.defaults.headers.common["Authorization"] = localStorage.jwt;
    // window.location.href = "/";
  }

  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  const [user, setUser] = React.useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser(true);
  };

  console.log(state);

  //==styles mui==========================

  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.down("md")]: {},
      [theme.breakpoints.up("lg")]: {},
    },
  }));

  const classes = useStyles();

  //===================================

  //responsive dewsign notes-- Double grid design, main grid split in 2 with navigation and main section,
  //navigation has another grid system with 3grids nested to get good alignment (to the right) when shrinking viewport.
  //navigation.js also has responsive layout to hide text at breakpoint.
  return (
    <div className="App">
      <Router>
        <Container>
          <Grid container spacing={3}>
            <Hidden xsDown>
              <Grid item xs={false} sm={2} md={2} lg={3}>
                <Container>
                  <Grid container>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4} lg={12} style={{ paddingRight: "20px" }}>
                      <Navigations />
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Hidden>

            <Grid item xs={12} sm={10} md={10} lg={9}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Switch>
                    <ProtectedRoute exact path="/" component={Home} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/register" component={Register} />
                    <ProtectedRoute
                      exact
                      path="/:username/:tweetId"
                      component={TweetDetails}
                    />
                    <ProtectedRoute
                      exact
                      path="/:username"
                      component={UserProfile}
                    />
                  </Switch>
                </Grid>

                <Hidden smDown>
                  <Grid item sm={false} md={4} lg={4}>
                    <Route component={SideBar}></Route>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Hidden smUp>
              <NavigationBottom />
            </Hidden>
          </Grid>
        </Container>
      </Router>
    </div>
  );
}

export default App;

///protected route function
function ProtectedRoute({ component: Component, user, ...rest }) {
  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.jwt) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
