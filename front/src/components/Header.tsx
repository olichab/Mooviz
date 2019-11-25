import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import '../scss/Header.scss';

import { AppState } from '../store';
import { signOut } from '../store/auth/authAction';

interface ISignOutProps {
  signOut: Function;
  isLogged: boolean;
}

class Header extends Component<ISignOutProps> {
  handleSignOut = () => {
    const { signOut } = this.props;
    signOut();
  };

  render() {
    const { isLogged } = this.props;
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg fixed-top">
          <Link className="navbar-brand" to="/">
            Mooviz
          </Link>
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
                <Link className="nav-link homeLink" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              {isLogged ? (
                <>
                  <li className="nav-item mt-auto mb-auto">
                    <Link className="nav-link collectionLink" to="/collection">
                      My collection
                    </Link>
                  </li>
                  <li className="nav-item mt-auto mb-auto">
                    <Link className="nav-link profileLink" to="/profile">
                      My profile
                    </Link>
                  </li>
                  <li className="nav-item mt-2 mt-md-2 mt-lg-auto mb-auto">
                    <Link
                      className="nav-link signoutBtn"
                      to="/signin"
                      onClick={this.handleSignOut}
                    >
                      Signout
                      <span className="icon">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mt-auto mb-auto">
                    <Link className="nav-link signinBtn" to="/signin">
                      Sign in
                      <span className="icon">
                        <FontAwesomeIcon icon={faKey} />
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item mt-2 mt-md-2 mt-lg-auto mb-auto">
                    <Link className="nav-link signupBtn" to="/signup">
                      Sign up
                      <span className="icon">
                        <FontAwesomeIcon icon={faUserPlus} />
                      </span>
                    </Link>
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

const mapStateToProps = (state: AppState) => ({
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps, {
  signOut,
})(Header);
