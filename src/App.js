import React from "react";

//components
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";

//contextAPI
import { UserContext } from "./contextAPI/userContext";

//==========================================================

function App() {
  const [state] = React.useContext(UserContext);

  console.log("APP", state);

  // if (localStorage.jwt) {
  //   axios.defaults.headers.common["Authorization"] = localStorage.jwt;
  // }

  return (
    <div>
      {localStorage.jwt ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
