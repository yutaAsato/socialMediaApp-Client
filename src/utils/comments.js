import React from "react";
import { useQuery, queryCache } from "react-query";
import { useClient } from "./api-client";

const config = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function useComments(endPoint) {
  const client = useClient();
  const data = useQuery({
    queryKey: "Comments",
    queryFn: () => client(endPoint).then((data) => data),
    ...config,
  });
  return data;
}

export { useComments };
