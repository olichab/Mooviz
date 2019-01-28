import React, { Component } from "react";
import Movies from "./Movies";
import SearchPart from "./SearchPart";

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <SearchPart />
        <Movies />
      </div>
    );
  }
}
