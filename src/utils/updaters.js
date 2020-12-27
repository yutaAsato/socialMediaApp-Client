import React from "react";
import { useQuery, queryCache, useMutation } from "react-query";
import { useClient } from "./api-client";

const config = {
  staleTime: 5000 * 60 * 60,
  cacheTime: 5000 * 60 * 60,
};

function useLike(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates }),
    {
      onSettled: () => {
        queryCache.invalidateQueries("HomeTweets");
        queryCache.invalidateQueries("tweets");
      },
    }
  );
}

function usePostComment(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates }),
    {
      onSettled: () => {
        queryCache.invalidateQueries("HomeTweets");
        queryCache.invalidateQueries("tweets");
        queryCache.invalidateQueries("Comments");
      },
    }
  );
}

function useEditDetails(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates }),
    {
      onSettled: () => {
        queryCache.invalidateQueries("Image");
        queryCache.invalidateQueries("relevantUser");
      },
    }
  );
}

function useMarkNotification(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates }),
    {
      onSettled: () => {
        queryCache.invalidateQueries("user");
      },
    }
  );
}

function useFollowUnfollow(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates }),
    {
      onSettled: () => {
        queryCache.invalidateQueries("user");
      },
    }
  );
}

function usePostTweet(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates })
    // {
    //   onSettled: () => {
    //     queryCache.invalidateQueries("user");
    //   },
    // }
  );
}

function useDeletePost(endPoint) {
  const client = useClient();

  return useMutation(
    () => client(endPoint, { method: "POST" })
    // {
    //   onSettled: () => {
    //     queryCache.invalidateQueries("user");
    //   },
    // }
  );
}

function useDeleteNotification(endPoint) {
  const client = useClient();

  return useMutation(
    (updates) => client(endPoint, { method: "POST", data: updates })
    // {
    //   onSettled: () => {
    //     queryCache.invalidateQueries("user");
    //   },
    // }
  );
}

export {
  useLike,
  usePostComment,
  useEditDetails,
  useMarkNotification,
  useFollowUnfollow,
  usePostTweet,
  useDeletePost,
  useDeleteNotification,
};
