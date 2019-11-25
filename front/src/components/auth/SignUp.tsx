import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import '../../scss/Signinsignup.scss';

import { AppState } from '../../store';
import { updateFormSignUp, signUp } from '../../store/auth/authAction';
import { IFormSignUp } from '../../store/auth/types';

const imgSignUp = require('../../img/sign_up.png');

interface ISignUpProps {
  updateFormSignUp: Function;
  signUp: Function;
  formSignUp: IFormSignUp;
  failedMsg: string;
}

class SignUp extends Component<ISignUpProps> {
  state = {
    hiddenPassword: true,
    hiddenConfirmPassword: true,
  };

  toggleShowPassword = () => {
    const { hiddenPassword } = this.state;
    this.setState({ hiddenPassword: !hiddenPassword });
  };

  toggleShowConfirmPassword = () => {
    const { hiddenConfirmPassword } = this.state;
    this.setState({ hiddenConfirmPassword: !hiddenConfirmPassword });
  };

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { updateFormSignUp, formSignUp } = this.props;
    const { value } = e.target;
    const { id } = e.target;
    updateFormSignUp(id, value, formSignUp);
  };

  handleSignUp = (e: React.FormEvent<HTMLFormElement>): void => {
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
                    type={hiddenPassword ? 'password' : 'text'}
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="addon-wrapping"
                    autoComplete="new-password"
                    onChange={this.updateForm}
                  />
                  <div className="input-group-append">
                    <button
                      className="input-group-text"
                      type="button"
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
                    </button>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-7 m-2 input-group">
                  <input
                    type={hiddenConfirmPassword ? 'password' : 'text'}
                    id="passwordBis"
                    className="form-control"
                    placeholder="Confirm password"
                    aria-label="passwordBis"
                    aria-describedby="addon-wrapping"
                    autoComplete="new-password"
                    onChange={this.updateForm}
                  />
                  <div className="input-group-append">
                    <button
                      className="input-group-text"
                      type="button"
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
                    </button>
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

const mapStateToProps = (state: AppState) => ({
  formSignUp: state.auth.formSignUp,
  failedMsg: state.auth.failedMsg,
});

export default connect(mapStateToProps, {
  updateFormSignUp,
  signUp,
})(SignUp);
