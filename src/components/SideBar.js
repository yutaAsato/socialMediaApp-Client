import React from "react";
import { useParams } from "react-router-dom";
import { FullPageSpinner } from "../utils/lib";

//components
import { Relevant } from "./Relevant";
import { WhoToFollow } from "./WhoToFollow";

//query
import { useUser } from "../utils/user";

//==================================================================
export function SideBar() {
  const { username: urlUser } = useParams();

  const user = useUser("user");

  console.log("Sidebar,", user);

  if (user) {
    return (
      <div style={{ paddingTop: "10px", width: "350px", paddingLeft: "35px" }}>
        {!urlUser ? (
          <WhoToFollow userData={user} />
        ) : urlUser !== user.username ? (
          <Relevant userData={user} urlUser={urlUser} />
        ) : (
          <WhoToFollow userData={user} />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <FullPageSpinner />
      </div>
    );
  }
}
