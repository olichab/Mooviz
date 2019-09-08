import React, { Component } from "react";

import "../scss/Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg fixed-top align-items-center">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              Mooviz
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav ">
              <a className="nav-item nav-link active" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
              {/* <a className="nav-item nav-link" href="/addMovie">
                Add movie
              </a> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
