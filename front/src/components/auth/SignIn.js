import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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
        <form onSubmit={this.handleSignIn}>
          <div className="row">
            <div className="col-12 m-2">
              <label htmlFor="email">Email</label>
            </div>
            <div className="col-12 offset-3">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="email"
                aria-label="email"
                aria-describedby="addon-wrapping"
                onChange={this.updateForm}
                required
              />
            </div>
            <div className="col-12 m-2">
              <label htmlFor="password">Password</label>
            </div>
            <div className="col-12 offset-3">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="password"
                aria-label="password"
                aria-describedby="addon-wrapping"
                onChange={this.updateForm}
                required
              />
            </div>
            {msgFailedLogin && (
              <div className="col-12 m-4">
                <span className="msgFailed">{msgFailedLogin}</span>
              </div>
            )}
            <div className="col-12 m-2">
              <button type="submit" className="btn btnSignIn m-2">
                Sign in
              </button>
            </div>
            <div className="col-12 m-2">
              <Link to="/signup">No account ? Sign up</Link>
            </div>
          </div>
        </form>
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
