import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import { AuthProvider } from "./authProvider";
import { UserProvider } from "./userContext";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: "1.2rem",
      fontWeight: "800",
    },
    body2: {
      fontSize: "1rem",
    },
    body3: {
      fontSize: "0.7rem",
    },
  },
});

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </UserProvider>
      </Router>
    </ReactQueryConfigProvider>
  );
}

export { AppProviders };
