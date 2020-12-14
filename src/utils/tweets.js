import React from "react";
import { useQuery, queryCache } from "react-query";
import { useClient } from "./api-client";

const config = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function useTweets(endPoint, dt) {
  const client = useClient();
  const data = useQuery({
    queryKey: ["tweets"],
    queryFn: () => client(endPoint, dt).then((data) => data),
    ...config,
  });
  return data;
}

//useHomeTweets is  POST request even though there is no data arguemnt, by default 'client' will make a GET request if there is no second
//data argument so we have to explicitly change Method to POST
function useHomeTweets(endPoint) {
  const client = useClient();
  const data = useQuery({
    queryKey: ["HomeTweets"],
    queryFn: () => client(endPoint, { method: "POST" }).then((data) => data),
    ...config,
  });

  return data;
}

export { useTweets, useHomeTweets };
