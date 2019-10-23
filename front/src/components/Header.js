import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faUserPlus,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

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
            className="collapse navbar-collapse justify-content-end align-items-center"
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item active mt-auto mb-auto">
                <a className="nav-link homeLink" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              {!isAuthenticated ? (
                <>
                  <li className="nav-item mt-auto mb-auto">
                    <a className="nav-link signinBtn" href="/signin">
                      Sign in
                      <span className="icon">
                        <FontAwesomeIcon icon={faKey} />
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mt-2 mt-md-2 mt-lg-auto mb-auto">
                    <a className="nav-link signupBtn" href="/signup">
                      Sign up
                      <span className="icon">
                        <FontAwesomeIcon icon={faUserPlus} />
                      </span>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mt-auto mb-auto">
                    <a className="nav-link collectionLink" href="/collection">
                      My collection
                    </a>
                  </li>
                  <li className="nav-item mt-2 mt-md-2 mt-lg-auto mb-auto">
                    <a
                      className="nav-link signoutBtn"
                      href="/"
                      onClick={this.handleSignOut}
                    >
                      Sign out
                      <span className="icon">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </span>
                    </a>
                  </li>
                </>
              )}
            </ul>
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
