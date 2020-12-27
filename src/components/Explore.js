import React from "react";

//component
import { SearchBox } from "./SearchBox";

export function Explore() {
  return (
    <div>
      <h1>Search For Somebody</h1>
      <div>
        <SearchBox styling={{ width: "250px", height: "30px" }} />
      </div>
    </div>
  );
}
