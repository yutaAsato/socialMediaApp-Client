import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { matchSorter } from "match-sorter";

import { useAllUsers } from "../utils/user";
import { useHistory, useLocation } from "react-router-dom";

//==========================================================
export function SearchBox({ styling }) {
  const { data, isLoading } = useAllUsers("allUsers");

  const [term, setTerm] = React.useState("");
  const results = useMatch(term, data);
  const handleChange = (event) => setTerm(event.target.value);
  const history = useHistory();
  const location = useLocation();

  //goToSearchUser
  function goToSearchUser(user) {
    console.log(user);

    history.push(`/${user}`);
  }

  let searchBoxStyle;

  if (location.pathname === "/explore") {
    searchBoxStyle = styling;
  } else {
    searchBoxStyle = { width: "342px", height: "20px", marginTop: "10px" };
  }

  return (
    <div style={{ paddingLeft: "35px" }}>
      {/* <h2>Search</h2> */}
      <Combobox aria-label="Cities" onSelect={(user) => goToSearchUser(user)}>
        <ComboboxInput
          className="city-search-input"
          onChange={handleChange}
          selectOnClick={true}
          style={searchBoxStyle}
          placeholder={"Search For A User"}
        />
        {results && (
          <ComboboxPopover className="shadow-popup">
            {results.length > 0 ? (
              <ComboboxList>
                {results.slice(0, 10).map((result, index) => (
                  <ComboboxOption key={index} value={`${result.username}`} />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                No results found
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  );
}

//matches user search with data
function useMatch(term, data) {
  //   const throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () =>
      term.trim() === ""
        ? null
        : matchSorter(data, term, {
            keys: [(user) => `${user.username}`],
          }),
    [data, term]
  );
}
