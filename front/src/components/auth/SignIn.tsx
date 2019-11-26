import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../../scss/Signinsignup.scss';

import { AppState } from '../../store';
import { updateFormSignIn, signIn } from '../../store/auth/authAction';
import { IFormSignIn } from '../../store/auth/types';

const imgSignIn = require('../../img/sign_in.svg');

interface ISignInProps {
  updateFormSignIn: Function;
  signIn: Function;
  formSignIn: IFormSignIn;
  failedMsg: string;
}

class SignIn extends Component<ISignInProps> {
  state = {
    hiddenPassword: true,
  };

  toggleShowPassword = () => {
    const { hiddenPassword } = this.state;
    this.setState({ hiddenPassword: !hiddenPassword });
  };

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { updateFormSignIn, formSignIn } = this.props;
    const { value } = e.target;
    const { id } = e.target;
    updateFormSignIn(id, value, formSignIn);
  };

  handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { signIn } = this.props;
    signIn();
  };

  render() {
    const { failedMsg } = this.props;
    const { hiddenPassword } = this.state;

    return (
      <div className="container-fluid signInContainer">
        <div className="row">
          <div className="col-12 col-md-6 imgSignIn">
            <img alt="sign in" src={imgSignIn} />
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
                    type={hiddenPassword ? 'password' : 'text'}
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

const mapStateToProps = (state: AppState) => ({
  formSignIn: state.auth.formSignIn,
  failedMsg: state.auth.failedMsg,
});

export default connect(mapStateToProps, {
  updateFormSignIn,
  signIn,
})(SignIn);
