/** @jsx jsx */
import { jsx } from "@emotion/react";

import React from "react";
// import * as auth from 'auth-provider'
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks";
import { FullPageSpinner, FullPageErrorFallback } from "../utils/lib";

//getting the token so useEffect can check everytime provider renders
function getToken() {
  let token;
  if (window.localStorage.getItem("jwt")) {
    token = `Bearer ${window.localStorage.getItem("jwt")}`;
  } else {
    token = null;
  }

  return token;
}

async function getUser() {
  let user = null;
  let token = getToken();
  if (token) {
    const data = await client("user", { token });
    user = data;
  }

  return user;
}

const userPromise = getUser();

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const {
    data,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync();

  //effect
  React.useEffect(() => {
    run(userPromise);
  }, [run]);

  //login
  const login = React.useCallback(
    (data) =>
      client("login", { data }).then((user) => {
        window.localStorage.setItem("jwt", user);
        setData(user);
      }),
    [setData]
  );

  //register
  const register = React.useCallback(
    (data) =>
      client("register", { data }).then((user) => {
        window.localStorage.setItem("jwt", user);
        setData(user);
      }),
    [setData]
  );

  //logout
  const logout = React.useCallback(() => {
    localStorage.removeItem("jwt");
    setData(null);
  }, [setData]);

  //value
  const value = React.useMemo(() => ({ data, login, logout, register }), [
    login,
    data,
    logout,
    register,
  ]);

  //returns
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

//useAuth
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

//useClient
function useClient() {
  const {
    user: { token },
  } = useAuth();
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth, useClient };
