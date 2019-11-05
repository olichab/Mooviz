import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { resetToastMessage } from "../actions/movieAction";

import "../scss/ToastMessage.scss";

class ToastMessage extends Component {
  componentDidMount() {
    const { resetToastMessage } = this.props;
    $(() => {
      $(".toast").toast("show");
    });
    $(".toast").on("hidden.bs.toast", () => {
      resetToastMessage();
    });
  }

  render() {
    const { toastMsg, toastMsgAuth, toastMsgUser } = this.props;
    return (
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="3500"
      >
        <div className="toast-header">
          <FontAwesomeIcon icon={faInfoCircle} className="icon" />
          <strong className="ml-2 mr-auto">{toastMsg.title || toastMsgAuth.title || toastMsgUser.title}</strong>
          <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{toastMsg.text || toastMsgAuth.text || toastMsgUser.text}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toastMsg: state.movieReducer.toastMsg,
  toastMsgAuth: state.authReducer.toastMsg,
  toastMsgUser: state.userReducer.toastMsg
});

export default connect(
  mapStateToProps,
  { resetToastMessage }
)(ToastMessage);
