import React, { useContext } from "react";
import axios from "axios";

import { queryCache } from "react-query";
import { UserContext } from "../contextAPI/userContext";

//---------------------------------------------------------
console.log("process.env.NODE_ENV =", process.env.NODE_ENV);
let apiURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  apiURL = `http://localhost:3000`;
  console.log("development mode");
} else {
  apiURL = `https://socialmedia-server.herokuapp.com`;
  console.log("production");
}

//------------------------------------------------------------------------------

//logout
function useHandlelogOut() {
  const [, dispatch] = useContext(UserContext);
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_AUTH", payload: false });
  dispatch({ type: "LOG_OUT" });
}

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? token : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        queryCache.clear();
        // await useHandlelogOut();
        // refresh the page for them
        window.location.assign(window.location);
        return Promise.reject({ message: "Please re-authenticate." });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

//useClient
function useClient() {
  let token = localStorage.jwt;
  token = `Bearer ${token}`;
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { useClient, client };
