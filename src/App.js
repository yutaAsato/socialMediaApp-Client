import React from "react";
import axios from "axios";

//components
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

//contextAPI
import { UserContext } from "./contextAPI/userContext";
//==========================================================

function App() {
  const [state, dispatch] = React.useContext(UserContext);

  if (localStorage.jwt) {
    axios.defaults.headers.common["Authorization"] = localStorage.jwt;
    // window.location.href = "/";
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/user"
        );
        dispatch({ type: "SET_USER", payload: result.data });
        dispatch({
          type: "SET_RELATIONSHIPS",
          payload: result.data.relationships,
        });
      } catch (err) {
        console.error({ error: err.response });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {localStorage.jwt ? (
        <AuthenticatedApp state={state} />
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
}

export default App;

//   <div className="App">
//     <Router>
//       <Container>
//         <Grid container spacing={3}>
//           <Hidden xsDown>
//             <Grid item xs={false} sm={2} md={2} lg={3}>
//               <Container>
//                 <Grid container>
//                   <Grid item sm={4}></Grid>
//                   <Grid item sm={4}></Grid>
//                   <Grid item sm={4} lg={12} style={{ paddingRight: "20px" }}>
//                     <Navigations />
//                   </Grid>
//                 </Grid>
//               </Container>
//             </Grid>
//           </Hidden>

//           <Grid item xs={12} sm={10} md={10} lg={9}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={12} md={8} lg={8}>
//                 <Switch>
//                   <ProtectedRoute exact path="/" component={Home} />
//                   <Route exact path="/login" component={LogIn} />
//                   <Route exact path="/register" component={Register} />
//                   <ProtectedRoute
//                     exact
//                     path="/:username/:tweetId"
//                     component={TweetDetails}
//                   />
//                   <ProtectedRoute
//                     exact
//                     path="/:username"
//                     component={UserProfile}
//                   />
//                 </Switch>
//               </Grid>

//               <Hidden smDown>
//                 <Grid item sm={false} md={4} lg={4}>
//                   <Route component={SideBar}></Route>
//                 </Grid>
//               </Hidden>
//             </Grid>
//           </Grid>
//           <Hidden smUp>
//             <NavigationBottom />
//           </Hidden>
//         </Grid>
//       </Container>
//     </Router>
//   </div>
