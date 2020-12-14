import React from "react";
import { useQuery, queryCache, useMutation } from "react-query";
import { useClient } from "./api-client";

function useNotifications(endPoint) {
  const client = useClient();

  return useMutation((updates) =>
    client(endPoint, { method: "POST", data: updates })
  );
}

export { useNotifications };
