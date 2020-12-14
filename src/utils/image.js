import React from "react";
import { useQuery, queryCache } from "react-query";
import { useClient } from "./api-client";

const config = {
  staleTime: 5000 * 60 * 60,
  cacheTime: 5000 * 60 * 60,
};

function useImage(endPoint) {
  //   const client = useClient();
  const { data } = useQuery({
    queryKey: "Image",
    queryFn: () => endPoint,
    ...config,
  });
  return data;
}

export { useImage };
