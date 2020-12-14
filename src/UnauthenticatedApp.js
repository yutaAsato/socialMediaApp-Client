import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { LogIn } from "./components/Login";
import { Navigations } from "./components/Navigations";
import { Register } from "./components/Register";
import { NavigationBottom } from "./components/NavigationBottom";

//mui
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";

function UnauthenticatedApp() {
  console.log("unAuthenticatedApp");

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
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Switch>
                  <Route exact path="/login" component={LogIn} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </Grid>

              <Hidden smDown>
                <Grid item sm={false} md={4} lg={4}></Grid>
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

export default UnauthenticatedApp;
