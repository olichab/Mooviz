import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "../../scss/Signinsignup.scss";

import { updateFormSignUp, signUp } from "../../actions/authAction";

class SignUp extends Component {
  updateForm = e => {
    const { updateFormSignUp, formSignUp } = this.props;
    const value = e.target.value;
    const id = e.target.id;
    updateFormSignUp(id, value, formSignUp);
  };

  handleSignUp = e => {
    e.preventDefault();
    const { signUp, formSignUp } = this.props;
    signUp(formSignUp);
  };

  render() {
    const { isRegister, msgSignUp } = this.props;
    if (isRegister) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container-fluid signUpContainer">
        <form onSubmit={this.handleSignUp}>
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
              />
            </div>
            <div className="col-12 m-2">
              <label htmlFor="pseudo">Pseudo</label>
            </div>
            <div className="col-12 offset-3">
              <input
                type="text"
                id="pseudo"
                className="form-control"
                placeholder="pseudo"
                aria-label="pseudo"
                aria-describedby="addon-wrapping"
                onChange={this.updateForm}
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
              />
            </div>
            <div className="col-12 m-2">
              <label htmlFor="passwordBis">Confirm password</label>
            </div>
            <div className="col-12 offset-3">
              <input
                type="password"
                id="passwordBis"
                className="form-control"
                placeholder="confirm password"
                aria-label="passwordBis"
                aria-describedby="addon-wrapping"
                onChange={this.updateForm}
              />
            </div>
            {msgSignUp && (
              <div className="col-12 m-4">
                <span className="msgFailed">{msgSignUp}</span>
              </div>
            )}
            <div className="col-12 m-2">
              <button type="submit" className="btn btnSignIn m-2">
                Create account
              </button>
            </div>
            <div className="col-12 m-2">
              <Link to="/signin">Already an account ? Sign in</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formSignUp: state.authReducer.formSignUp,
  msgSignUp: state.authReducer.msgSignUp,
  isRegister: state.authReducer.isRegister
});

export default connect(
  mapStateToProps,
  {
    updateFormSignUp,
    signUp
  }
)(SignUp);
