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

  console.log("APP");
  if (localStorage.jwt) {
    axios.defaults.headers.common["Authorization"] = localStorage.jwt;
    // window.location.href = "/";
  }

  return (
    <div>
      {localStorage.jwt ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
