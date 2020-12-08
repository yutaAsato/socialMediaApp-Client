import React from "react";
import { useParams } from "react-router-dom";

//components
import { Relevant } from "./Relevant";
import { WhoToFollow } from "./WhoToFollow";

//if url in state has user data render <Relevant/> if not something else
//==================================================================
export function SideBar({ state }) {
  const { username: urlUser } = useParams();

  if (state.loggedUser) {
    return (
      <div style={{ paddingTop: "10px" }}>
        {urlUser !== state.loggedUser.username ? (
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
