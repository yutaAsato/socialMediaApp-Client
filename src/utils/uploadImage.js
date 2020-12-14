import React from "react";
import { useQuery, queryCache, useMutation } from "react-query";
import { useClient } from "./api-client";

const config = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function useUpload(endPoint) {
  let token = localStorage.jwt;
  token = `Bearer ${token}`;
  return useMutation(
    (updates) =>
      window
        .fetch(`https://socialmedia-server.herokuapp.com/${endPoint}`, {
          method: "POST",
          body: updates,
          headers: {
            Authorization: token ? token : undefined,
          },
        })
        .then((data) => data),
    {
      onSettled: () => {
        queryCache.invalidateQueries("Image");
      },
    }
  );
}

// function useUpload(endPoint) {
//   let token = localStorage.jwt;
//   token = `Bearer ${token}`;
//   return useQuery(
//     "profilePic",
//     (updates) =>
//       window.fetch(`https://socialmedia-server.herokuapp.com/${endPoint}`, {
//         method: "POST",
//         body: updates,
//         headers: {
//           Authorization: token ? token : undefined,
//         },
//       })
//     //   .then(async (response) => {
//     //     if (response.status === 401) {
//     //       queryCache.clear();
//     //       // await useHandlelogOut();
//     //       // refresh the page for them
//     //       window.location.assign(window.location);
//     //       return Promise.reject({ message: "Please re-authenticate." });
//     //     }
//     //     const data = await response.json();
//     //     if (response.ok) {
//     //       return data;
//     //     } else {
//     //       return Promise.reject(data);
//     //     }
//     //   })
//   );
// }

export { useUpload };
