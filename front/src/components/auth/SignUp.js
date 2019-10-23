import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import imgSignUp from "../../img/sign_up.png";

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
        <div className="row">
          <div className="col-12 col-md-6 order-1 order-md-2 imgSignUp ">
            <img alt="icon" src={imgSignUp} />
          </div>
          <div className="col-12 col-md-6 p-4 my-auto order-2 order-md-1">
            <form onSubmit={this.handleSignUp}>
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
                    type="text"
                    id="pseudo"
                    className="form-control"
                    placeholder="Pseudo"
                    aria-label="pseudo"
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
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-7 m-2">
                  <input
                    type="password"
                    id="passwordBis"
                    className="form-control"
                    placeholder="Confirm password"
                    aria-label="passwordBis"
                    aria-describedby="addon-wrapping"
                    onChange={this.updateForm}
                  />
                </div>
              </div>
              {msgSignUp && (
                <div className="row justify-content-center">
                  <div className="col-auto m-2 text-center">
                    <span className="msgFailed">{msgSignUp}</span>
                  </div>
                </div>
              )}
              <div className="row justify-content-center">
                <div className="col-auto m-2 text-center">
                  <button type="submit" className="btn btnSignUp">
                    SIGN UP
                    <span className="icon">
                      <FontAwesomeIcon icon={faUserPlus} />
                    </span>
                  </button>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto m-1 text-center">
                  <Link to="/signin">Already an account ? Sign in</Link>
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
