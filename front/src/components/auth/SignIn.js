import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

import imgSignIn from '../../img/sign_in.png';

import "../../scss/Signinsignup.scss";

import { updateFormSignIn, signIn } from "../../actions/authAction";

class SignIn extends Component {
  updateForm = e => {
    const { updateFormSignIn, formSignIn } = this.props;
    const value = e.target.value;
    const id = e.target.id;
    updateFormSignIn(id, value, formSignIn);
  };

  handleSignIn = e => {
    e.preventDefault();
    const { signIn, formSignIn } = this.props;
    signIn(formSignIn);
  };

  render() {
    const { isAuthenticated, msgFailedLogin } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/collection" />;
    }
    return (
      <div className="container-fluid signInContainer">
        <div className="row">
          <div className="col-12 col-md-6 imgSignIn">
            <img alt="icon" src={imgSignIn} />
          </div>
          <div className="col-12 col-md-6 p-4 my-auto">
            <form onSubmit={this.handleSignIn}>
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-7 m-2">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    aria-label="email"
                    aria-describedby="addon-wrapping"
                    onChange={this.updateForm}
                    required
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-7 m-2">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="addon-wrapping"
                    onChange={this.updateForm}
                    required
                  />
                </div>
              </div>
              {msgFailedLogin && (
                <div className="row justify-content-center">
                  <div className="col-auto m-2 text-center">
                    <span className="msgFailed">{msgFailedLogin}</span>
                  </div>
                </div>
              )}
              <div className="row justify-content-center">
                <div className="col-auto m-2 text-center">
                  <button type="submit" className="btn btnSignIn">
                    SIGN IN
                    <span className="icon">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                  </button>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto m-1 text-center">
                  <Link to="/signup">No account ? Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formSignIn: state.authReducer.formSignIn,
  isAuthenticated: state.authReducer.isAuthenticated,
  msgFailedLogin: state.authReducer.msgFailedLogin
});

export default connect(
  mapStateToProps,
  {
    updateFormSignIn,
    signIn
  }
)(SignIn);
