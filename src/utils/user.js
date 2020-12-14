import React from "react";
import { useQuery, queryCache } from "react-query";
import { useClient } from "./api-client";

const loading = {
  user: {
    bio: "Loading..",
    created_at: "Loading..",
    email: "Loading..",
    location: "Loading..",
    password: "Loading..",
    update_at: "Loading..",
    user_id: "Loading..",
    username: "Loading..",
    website: "Loading..",
  },
  relationships: [],
  notifications: [],
};
const config = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function useUser(endPoint) {
  const client = useClient();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => client(endPoint).then((data) => data),
    // ...config,
  });
  return data ?? loading;
}

function useRelevantUser(endPoint, dt) {
  const client = useClient();
  return useQuery(
    {
      queryKey: ["relevantUser", dt],
      queryFn: () => client(endPoint, dt).then((data) => data),
    }
    // { refetchInterval: 1000 }
  );
}

function useWhoToFollow(endPoint) {
  const client = useClient();
  return useQuery(
    {
      queryKey: ["whoToFollow"],
      queryFn: () => client(endPoint).then((data) => data),
    }
    // { refetchInterval: 1000 }
  );
}

export { useUser, useRelevantUser, useWhoToFollow };
