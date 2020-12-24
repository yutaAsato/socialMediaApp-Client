import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
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

//utils/hooks
import { useClient } from "./utils/api-client";

//query
import { useUser } from "./utils/user";
import { useHomeTweets } from "./utils/tweets";

//-------------------------------------------------

function AuthenticatedApp() {
  const location = useLocation();
  console.log(location);

  const user = useUser("user");
  //   const data = useHomeTweets("followTweets");

  console.log("Authenticatedapp-user", user);

  //responsive dewsign notes-- Double grid design, main grid split in 2 with navigation and main section,
  //navigation has another grid system with 3grids nested to get good alignment (to the right) when shrinking viewport.
  //navigation.js also has responsive layout to hide text at breakpoint.
  return (
    <div className="App">
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
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={LogIn} />
                  <Route exact path="/register" component={Register} />
                  <Route
                    exact
                    path="/:username/:tweetId"
                    component={TweetDetails}
                  />
                  <Route
                    exact
                    path="/:username"
                    component={UserProfile}
                    key={location.pathname}
                  />
                </Switch>
              </Grid>

              <Hidden lgDown>
                <Grid item sm={false} md={4} lg={4}>
                  <Route exact path={["/:username", "/:username/:id", "/"]}>
                    <SideBar user={user} />
                  </Route>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Hidden smUp>
            <NavigationBottom />
          </Hidden>
        </Grid>
      </Container>
    </div>
  );
}

export default AuthenticatedApp;
