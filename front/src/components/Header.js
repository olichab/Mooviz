import React, { Component } from "react";
import { connect } from "react-redux";

import { signOut } from "../actions/authAction";

import "../scss/Header.scss";

class Header extends Component {
  handleSignOut = () => {
    const { signOut } = this.props;
    signOut();
  };

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg fixed-top">
          <a className="navbar-brand" href="/">
            Mooviz
          </a>
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
            {!isAuthenticated ? (
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/signin">
                  Sign in
                </a>
                <a className="nav-item nav-link" href="/signup">
                  Sign up
                </a>
              </div>
            ) : (
              <div className="navbar-nav">
                <a
                  className="nav-item nav-link"
                  href="/"
                  onClick={this.handleSignOut}
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    signOut
  }
)(Header);
