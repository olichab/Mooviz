import React, { Component } from "react";
import Movies from "./Movies";
import SearchPart from "./SearchPart";

export default class Home extends Component {
  state = {
    nameMovieSearch: ""
  };
  handleSearchMovie = nameMovieSearch => {
    this.setState({ nameMovieSearch });
  };
  render() {
    const { nameMovieSearch } = this.state;
    return (
      <div>
        <SearchPart handleSearchMovie={this.handleSearchMovie} />
        <Movies nameMovieSearch={nameMovieSearch} />
      </div>
    );
  }
}
