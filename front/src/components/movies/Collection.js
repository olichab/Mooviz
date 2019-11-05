import React, { Component } from "react";
import Movies from "./Movies";
import SearchPart from "./SearchPart";

export default class Collection extends Component {
  render() {
    return (
      <div>
        <SearchPart />
        <Movies />
      </div>
    );
  }
}
