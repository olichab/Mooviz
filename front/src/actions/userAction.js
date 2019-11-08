import axios from "axios";

import {
  UPDATE_FORM_PROFILE,
  GET_USER_INFOS,
  SAVE_UPDATE_PROFILE
} from "./types";

const domain = process.env.REACT_APP_DOMAIN_NAME;

export const getUserInfos = () => dispatch => {
  const url = `${domain}/users/`;
  const token = localStorage.token;

  axios({
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch({
        type: GET_USER_INFOS,
        loading: false,
        userInfos: { email: res.data[0].email, pseudo: res.data[0].pseudo },
        formProfile: {
          email: res.data[0].email,
          pseudo: res.data[0].pseudo,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }
      });
    })
    .catch(error => {
      console.log("error", error);
      dispatch({
        type: GET_USER_INFOS
      });
    });
};

export const updateFormProfile = (id, value, formProfile) => dispatch => {
  switch (id) {
    case "email":
      formProfile.email = value;
      break;
    case "pseudo":
      formProfile.pseudo = value;
      break;
    case "oldPassword":
      formProfile.oldPassword = value;
      break;
    case "newPassword":
      formProfile.newPassword = value;
      break;
    case "confirmNewPassword":
      formProfile.confirmNewPassword = value;
      break;
    default:
      break;
  }
  dispatch({
    type: UPDATE_FORM_PROFILE,
    formProfile: formProfile
  });
};

export const saveUpdateProfile = formProfile => dispatch => {
  const token = localStorage.token;
  const url = `${domain}/users/`;
  axios({
    method: "PUT",
    url,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: formProfile
  })
    .then(res => {
      dispatch({
        type: SAVE_UPDATE_PROFILE,
        toastMsg: {
          title: "Updated",
          text: res.data.message
        }
      });
    })
    .catch(error => {
      console.log("error", error);
      dispatch({
        type: SAVE_UPDATE_PROFILE,
        failedMsg:
          error.response && error.response.data
            ? error.response.data.message
            : ""
      });
    });
};
