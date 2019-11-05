import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

import imgSignUp from "../../img/sign_up.png";

import "../../scss/Signinsignup.scss";

import { updateFormSignUp, signUp } from "../../actions/authAction";

class SignUp extends Component {
  state = {
    hiddenPassword: true,
    hiddenConfirmPassword: true
  };

  toggleShowPassword = () => {
    const { hiddenPassword } = this.state;
    this.setState({ hiddenPassword: !hiddenPassword });
  };

  toggleShowConfirmPassword = () => {
    const { hiddenConfirmPassword } = this.state;
    this.setState({ hiddenConfirmPassword: !hiddenConfirmPassword });
  };

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
    const { failedMsg } = this.props;
    const { hiddenPassword, hiddenConfirmPassword } = this.state;

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
                    autoComplete="username"
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
                    autoComplete="username"
                    onChange={this.updateForm}
                    required
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-7 m-2 input-group">
                  <input
                    type={hiddenPassword ? "password" : "text"}
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="addon-wrapping"
                    autoComplete="new-password"
                    onChange={this.updateForm}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={this.toggleShowPassword}
                    >
                      {hiddenPassword ? (
                        <FontAwesomeIcon className="iconEye" icon={faEye} />
                      ) : (
                        <FontAwesomeIcon
                          className="iconEye"
                          icon={faEyeSlash}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-7 m-2 input-group">
                  <input
                    type={hiddenConfirmPassword ? "password" : "text"}
                    id="passwordBis"
                    className="form-control"
                    placeholder="Confirm password"
                    aria-label="passwordBis"
                    aria-describedby="addon-wrapping"
                    autoComplete="new-password"
                    onChange={this.updateForm}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={this.toggleShowConfirmPassword}
                    >
                      {hiddenConfirmPassword ? (
                        <FontAwesomeIcon className="iconEye" icon={faEye} />
                      ) : (
                        <FontAwesomeIcon
                          className="iconEye"
                          icon={faEyeSlash}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {failedMsg && (
                <div className="row justify-content-center">
                  <div className="col-auto m-2 text-center">
                    <span className="failedMsg">{failedMsg}</span>
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
  failedMsg: state.authReducer.failedMsg
});

export default connect(
  mapStateToProps,
  {
    updateFormSignUp,
    signUp
  }
)(SignUp);
