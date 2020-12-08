import React from "react";
// import { render } from "@testing-library/react";

//create context
const initialState = {};
export const UserContext = React.createContext(initialState);

//reducer
function dataReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        loggedUser: {
          username: action.payload.user.username,
          email: action.payload.user.email,
          userId: action.payload.user.user_id,
          joined: action.payload.user.created_at,
          bio: action.payload.user.bio,
          website: action.payload.user.website,
          location: action.payload.user.location,
          notifications: [...action.payload.notifications],
        },
      };
    case "SET_TWEETS":
      return {
        ...state,
        tweets: [...action.payload],
      };
    case "SET_USER_TWEETS":
      return {
        ...state,
        userTweets: [...action.payload],
      };
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload,
      };
    case "SET_LIKES":
      return {
        ...state,
        likes: [...action.payload],
      };
    case "SET_RELATIONSHIPS":
      return {
        ...state,
        relationships: [...action.payload],
      };
    case "URL_DATA":
      return {
        ...state,
        url: [action.payload],
      };
    case "SET_RELEVANT_USER":
      return {
        ...state,
        relevantUser: [action.payload],
      };
    case "SET_RELEVANT_RELATIONSHIPS":
      return {
        ...state,
        relevantRelationships: [...action.payload],
      };
    case "SET_RELEVANT_COMMENTS":
      return {
        ...state,
        relevantComments: [...action.payload],
      };
    // case "RELEVANT_LIKES":
    //   return {
    //     ...state,
    //     relevantLikes: [...action.payload],
    //   };
    case "SET_RELEVANT_USER_IMAGE":
      return {
        ...state,
        relevantUserImage: action.payload,
      };
    case "SET_WHO_TO_FOLLOW":
      return {
        ...state,
        whoToFollow: [...action.payload],
      };
    case "LOG_OUT":
      return {
        // ...state,
        // relationships: [],
        // loggedUser: null,
        ...state,
        initial,
      };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

const initial = {
  loggedUser: null,
  relationships: [],
  userTweets: [],
  tweets: [],
  likes: [],
  auth: false,
  url: [],
  relevantUser: [],
  relevantRelationships: [],
  relevantComments: [],
  // relevantLikes: [],
  relevantUserImage: "",
  whoToFollow: [],
};

//provider
export function UserProvider(props) {
  const [state, dispatch] = React.useReducer(dataReducer, initial);

  const value = React.useMemo(() => [state, dispatch], [state]);
  return <UserContext.Provider value={value} {...props} />;
}
