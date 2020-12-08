import React from "react";
import { useParams } from "react-router-dom";

//components
import { Relevant } from "./Relevant";
import { WhoToFollow } from "./WhoToFollow";

//==================================================================
export function SideBar({ state }) {
  const { username: urlUser } = useParams();

  if (state.loggedUser) {
    return (
      <div style={{ paddingTop: "10px" }}>
        {!urlUser ? (
          <WhoToFollow />
        ) : urlUser !== state.loggedUser.username ? (
          <Relevant urlUser={urlUser} />
        ) : (
          <WhoToFollow />
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
}
