import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../Spinner';
import '../../scss/Profile.scss';

import { AppState } from '../../store';
import {
  getUserInfos,
  updateFormProfile,
  saveUpdateProfile,
} from '../../store/user/userAction';
import { IUserInfos, IFormProfile } from '../../store/user/types';

interface IProfileProps {
  getUserInfos: Function;
  updateFormProfile: Function;
  saveUpdateProfile: Function;
  formProfile: IFormProfile;
  isLogged: boolean;
  loading: boolean;
  userInfos: IUserInfos;
  failedMsg: string;
}

class Profile extends Component<IProfileProps> {
  state = {
    hiddenOldPassword: true,
    hiddenNewPassword: true,
    hiddenConfirmNewPassword: true,
  };

  componentDidMount = () => {
    setTimeout(() => {
      const { getUserInfos } = this.props;
      getUserInfos();
    }, 500);
  };

  toggleShowOldPassword = () => {
    const { hiddenOldPassword } = this.state;
    this.setState({ hiddenOldPassword: !hiddenOldPassword });
  };

  toggleShowNewPassword = () => {
    const { hiddenNewPassword } = this.state;
    this.setState({ hiddenNewPassword: !hiddenNewPassword });
  };

  toggleShowConfirmNewPassword = () => {
    const { hiddenConfirmNewPassword } = this.state;
    this.setState({ hiddenConfirmNewPassword: !hiddenConfirmNewPassword });
  };

  updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { updateFormProfile, formProfile } = this.props;
    const { value } = e.target;
    const field = e.target.id;
    updateFormProfile(field, value, formProfile);
  };

  saveChanges = () => {
    const { saveUpdateProfile } = this.props;
    saveUpdateProfile();
  };

  render() {
    const {
      hiddenOldPassword,
      hiddenNewPassword,
      hiddenConfirmNewPassword,
    } = this.state;

    const { loading, userInfos, failedMsg } = this.props;

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="container Profile">
            <div className="card m-2">
              <div className="card-header">My profile</div>
              <form autoComplete="off">
                <div className="card-body pb-0">
                  <div className="row mt-0 mb-3 ml-3 mr-3">
                    <div className="col-12">
                      <h6 className="card-title">Email</h6>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 ml-2">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        aria-label="email"
                        aria-describedby="addon-wrapping"
                        autoComplete="username"
                        defaultValue={userInfos ? userInfos.email : ''}
                        onInput={this.updateForm}
                      />
                    </div>
                  </div>
                  <div className="row mb-0 mt-3 ml-3 mr-3">
                    <div className="col-12">
                      <h6 className="card-title">Pseudo</h6>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 ml-2">
                      <input
                        type="text"
                        id="pseudo"
                        className="form-control"
                        aria-label="pseudo"
                        aria-describedby="addon-wrapping"
                        autoComplete="username"
                        defaultValue={userInfos ? userInfos.pseudo : ''}
                        onInput={this.updateForm}
                      />
                    </div>
                  </div>
                  <div
                    className="collapse no-gutters"
                    id="collapseChangePassword"
                  >
                    <hr />
                    <div className="row m-3">
                      <div className="col-12">
                        <h6 className="card-title">Old password</h6>
                      </div>
                      <div className="col-12 col-md-6 col-lg-5 ml-2 input-group">
                        <input
                          type={hiddenOldPassword ? 'password' : 'text'}
                          id="oldPassword"
                          className="form-control"
                          aria-label="old password"
                          aria-describedby="addon-wrapping"
                          autoComplete="new-password"
                          onChange={this.updateForm}
                        />
                        <div className="input-group-append">
                          <button
                            className="input-group-text"
                            type="button"
                            onClick={this.toggleShowOldPassword}
                          >
                            {hiddenOldPassword ? (
                              <FontAwesomeIcon className="icon" icon={faEye} />
                            ) : (
                              <FontAwesomeIcon
                                className="icon"
                                icon={faEyeSlash}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row m-3">
                      <div className="col-12">
                        <h6 className="card-title">New password</h6>
                      </div>
                      <div className="col-12 col-md-6 col-lg-5 ml-2 input-group">
                        <input
                          type={hiddenNewPassword ? 'password' : 'text'}
                          id="newPassword"
                          className="form-control"
                          aria-label="new password"
                          aria-describedby="addon-wrapping"
                          autoComplete="new-password"
                          onChange={this.updateForm}
                        />
                        <div className="input-group-append">
                          <button
                            className="input-group-text"
                            type="button"
                            onClick={this.toggleShowNewPassword}
                          >
                            {hiddenNewPassword ? (
                              <FontAwesomeIcon className="icon" icon={faEye} />
                            ) : (
                              <FontAwesomeIcon
                                className="icon"
                                icon={faEyeSlash}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row m-3">
                      <div className="col-12">
                        <h6 className="card-title">Confirm new password</h6>
                      </div>
                      <div className="col-12 col-md-6 col-lg-5 ml-2 input-group">
                        <input
                          type={hiddenConfirmNewPassword ? 'password' : 'text'}
                          id="confirmNewPassword"
                          className="form-control"
                          aria-label="confirm new password"
                          aria-describedby="addon-wrapping"
                          autoComplete="new-password"
                          onChange={this.updateForm}
                        />
                        <div className="input-group-append">
                          <button
                            className="input-group-text"
                            type="button"
                            onClick={this.toggleShowConfirmNewPassword}
                          >
                            {hiddenConfirmNewPassword ? (
                              <FontAwesomeIcon className="icon" icon={faEye} />
                            ) : (
                              <FontAwesomeIcon
                                className="icon"
                                icon={faEyeSlash}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {failedMsg && (
                    <div className="row ml-3 mt-4">
                      <div className="col-auto">
                        <span className="failedMsg">{failedMsg}</span>
                      </div>
                    </div>
                  )}
                </div>
              </form>
              <div className="row m-3">
                <div className="col-12 col-md-auto d-inline-block text-center p-1">
                  <button
                    type="button"
                    className="btn m-2 resetPasswordBtn"
                    data-toggle="collapse"
                    data-target="#collapseChangePassword"
                    aria-expanded="false"
                    aria-controls="collapseChangePassword"
                  >
                    Change my password
                  </button>
                </div>
                <div className="col-12 col-md-auto d-inline-block text-center p-1">
                  <button
                    type="button"
                    className="btn m-2 saveBtn"
                    onClick={this.saveChanges}
                  >
                    Save
                  </button>
                </div>
                <div className="col-12 col-md-auto d-inline-block text-center p-1">
                  <Link className="linkUnstyled" to="/collection">
                    <button type="button" className="btn m-2 cancelBtn">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.user.loading,
  userInfos: state.user.userInfos,
  formProfile: state.user.formProfile,
  failedMsg: state.user.failedMsg,
});

export default connect(mapStateToProps, {
  getUserInfos,
  updateFormProfile,
  saveUpdateProfile,
})(Profile);
