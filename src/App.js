import React from "react";
import { useAuth } from "../src/contextAPI/authProvider";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageErrorFallback } from "../src/utils/lib";

//components
// import { AuthenticatedApp } from "./AuthenticatedApp";
// import { UnauthenticatedApp } from "./UnauthenticatedApp";

import { ReactQueryDevtools } from "react-query-devtools";
import { FullPageSpinner } from "./utils/lib";

//Lazy load
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./AuthenticatedApp")
);
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

//==========================================================

function App() {
  const { data } = useAuth();
  // console.log(data.user);

  const apiURL =
    process.env.REACT_APP_API_URL || `https://socialmedia-server.herokuapp.com`;

  console.log(apiURL);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    console.log("development mode");
  } else {
    console.log("production");
    // production code
  }

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        {data ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>

      <ReactQueryDevtools initialIsOpen={false} />
    </React.Suspense>
  );
}

export default App;
