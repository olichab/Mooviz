import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import {
  getUserInfos,
  updateFormProfile,
  saveUpdateProfile
} from "../../actions/userAction";

import "../../scss/Profile.scss";

class Profile extends Component {
  state = {
    hiddenOldPassword: true,
    hiddenNewPassword: true,
    hiddenConfirmNewPassword: true
  };

  componentDidMount = () => {
    const { getUserInfos } = this.props;
    getUserInfos();
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

  updateForm = e => {
    const { updateFormProfile, formProfile } = this.props;
    const value = e.target.value;
    const id = e.target.id;
    updateFormProfile(id, value, formProfile);
  };

  saveChanges = () => {
    const { saveUpdateProfile, formProfile } = this.props;
    saveUpdateProfile(formProfile);
  };

  render() {
    const {
      hiddenOldPassword,
      hiddenNewPassword,
      hiddenConfirmNewPassword
    } = this.state;

    const { userInfos, failedMsg } = this.props;

    return (
      <div className="container Profile">
        <div className="card">
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
                    defaultValue={userInfos ? userInfos.email : ""}
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
                    defaultValue={userInfos ? userInfos.pseudo : ""}
                    onInput={this.updateForm}
                  />
                </div>
              </div>
              <div className="collapse no-gutters" id="collapseChangePassword">
                <hr />
                <div className="row m-3">
                  <div className="col-12">
                    <h6 className="card-title">Old password</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg-5 ml-2 input-group">
                    <input
                      type={hiddenOldPassword ? "password" : "text"}
                      id="oldPassword"
                      className="form-control"
                      aria-label="old password"
                      aria-describedby="addon-wrapping"
                      autoComplete="new-password"
                      onChange={this.updateForm}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={this.toggleShowOldPassword}
                      >
                        {hiddenOldPassword ? (
                          <FontAwesomeIcon className="icon" icon={faEye} />
                        ) : (
                          <FontAwesomeIcon className="icon" icon={faEyeSlash} />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col-12">
                    <h6 className="card-title">New password</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg-5 ml-2 input-group">
                    <input
                      type={hiddenNewPassword ? "password" : "text"}
                      id="newPassword"
                      className="form-control"
                      aria-label="new password"
                      aria-describedby="addon-wrapping"
                      autoComplete="new-password"
                      onChange={this.updateForm}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={this.toggleShowNewPassword}
                      >
                        {hiddenNewPassword ? (
                          <FontAwesomeIcon className="icon" icon={faEye} />
                        ) : (
                          <FontAwesomeIcon className="icon" icon={faEyeSlash} />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col-12">
                    <h6 className="card-title">Confirm new password</h6>
                  </div>
                  <div className="col-12 col-md-6 col-lg-5 ml-2 input-group">
                    <input
                      type={hiddenConfirmNewPassword ? "password" : "text"}
                      id="confirmNewPassword"
                      className="form-control"
                      aria-label="confirm new password"
                      aria-describedby="addon-wrapping"
                      autoComplete="new-password"
                      onChange={this.updateForm}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={this.toggleShowConfirmNewPassword}
                      >
                        {hiddenConfirmNewPassword ? (
                          <FontAwesomeIcon className="icon" icon={faEye} />
                        ) : (
                          <FontAwesomeIcon className="icon" icon={faEyeSlash} />
                        )}
                      </span>
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
            <button
              type="button"
              className="btn m-2 saveBtn"
              onClick={this.saveChanges}
            >
              Save
            </button>
            <button type="button" className="btn m-2 cancelBtn">
                <Link className="linkUnstyled" to="/collection">Cancel</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfos: state.userReducer.userInfos,
  formProfile: state.userReducer.formProfile,
  failedMsg: state.userReducer.failedMsg
});

export default connect(
  mapStateToProps,
  { getUserInfos, updateFormProfile, saveUpdateProfile }
)(Profile);
