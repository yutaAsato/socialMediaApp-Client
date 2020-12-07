import React from "react";
import axios from "axios";

//contextAPI
import { UserContext } from "../contextAPI/userContext";

//components
import { Relevant } from "./Relevant";
import { WhoToFollow } from "./WhoToFollow";

//if url in state has user data render <Relevant/> if not something else

export function SideBar(props) {
  //--contextAPI--------
  const [state, dispatch] = React.useContext(UserContext);

  //local (prevent dom loading until state updated)
  const [loading, setLoading] = React.useState(false);

  //whoTofollow
  React.useEffect(() => {
    //toggel loading state
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/whoToFollow"
        );
        dispatch({
          type: "SET_WHO_TO_FOLLOW",
          payload: result.data,
        });

        //toggle loading state
        setLoading(false);
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [dispatch, state.auth]);

  //user
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://socialmedia-server.herokuapp.com/user"
        );
        dispatch({ type: "SET_USER", payload: result.data });
        dispatch({
          type: "SET_RELATIONSHIPS",
          payload: result.data.relationships,
        });
      } catch {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div style={{ paddingTop: "10px" }}>
      {!loading ? (
        state.url[0] && state.url[0].username !== state.loggedUser.username ? (
          <Relevant />
        ) : (
          <WhoToFollow />
        )
      ) : null}
    </div>
  );
}
