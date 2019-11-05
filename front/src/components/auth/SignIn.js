import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import imgSignIn from "../../img/sign_in.png";

import "../../scss/Signinsignup.scss";

import { updateFormSignIn, signIn } from "../../actions/authAction";

class SignIn extends Component {
  state = {
    hiddenPassword: true
  };

  toggleShowPassword = () => {
    const { hiddenPassword } = this.state;
    this.setState({ hiddenPassword: !hiddenPassword });
  };

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
    const { failedMsg } = this.props;
    const { hiddenPassword } = this.state;

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
                    autoComplete="current-password"
                    onChange={this.updateForm}
                    required
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
              {failedMsg && (
                <div className="row justify-content-center">
                  <div className="col-auto m-2 text-center">
                    <span className="failedMsg">{failedMsg}</span>
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
  failedMsg: state.authReducer.failedMsg
});

export default connect(
  mapStateToProps,
  {
    updateFormSignIn,
    signIn
  }
)(SignIn);
