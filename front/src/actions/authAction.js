import axios from "axios";

import {
  UPDATE_FORM_SIGN_IN,
  UPDATE_FORM_SIGN_UP,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  GET_PROFILE_FETCH
} from "./types";

const domain = process.env.REACT_APP_DOMAIN_NAME;

export const updateFormSignIn = (id, value, formSignIn) => dispatch => {
  switch (id) {
    case "email":
      formSignIn.email = value;
      break;
    case "password":
      formSignIn.password = value;
      break;
    default:
      break;
  }
  dispatch({
    type: UPDATE_FORM_SIGN_IN,
    formSignIn: formSignIn
  });
};

export const updateFormSignUp = (id, value, formSignUp) => dispatch => {
  switch (id) {
    case "email":
      formSignUp.email = value;
      break;
    case "pseudo":
      formSignUp.pseudo = value;
      break;
    case "password":
      formSignUp.password = value;
      break;
    case "passwordBis":
      formSignUp.passwordBis = value;
      break;
    default:
      break;
  }
  dispatch({
    type: UPDATE_FORM_SIGN_UP,
    formSignUp: formSignUp
  });
};

export const signIn = formSignIn => dispatch => {
  const url = `${domain}/auth/signin`;
  const body = formSignIn;
  axios({
    method: "POST",
    url,
    data: body
  })
    .then(res => {
      localStorage.setItem("token", res.headers["x-access-token"]);
      localStorage.setItem("pseudo", res.data.pseudo);
      localStorage.setItem("user_id", res.data.id_user);
      dispatch({
        type: SIGN_IN,
        formSignIn: { email: "", password: "" },
        isAuthenticated: true,
        msgFailedLogin: ""
      });
    })
    .catch(error => {
      dispatch({
        type: SIGN_IN,
        formSignIn: formSignIn,
        msgFailedLogin: error.response.data.message
      });
    });
};

export const signUp = formSignUp => dispatch => {
  const { email, pseudo, password, passwordBis } = formSignUp;
  const url = `${domain}/auth/signup`;
  const body = {
    email,
    pseudo,
    password,
    passwordBis
  };
  axios({
    method: "POST",
    url,
    data: body
  })
    .then(res => {
      dispatch({
        type: SIGN_UP,
        formSignUp: { email: "", pseudo: "", password: "", passwordBis: "" },
        msgSignUp: res.data.message,
        isRegister: true
      });
    })
    .catch(error => {
      dispatch({
        type: SIGN_UP,
        formSignUp: formSignUp,
        msgSignUp: error.response.data.message
      });
    });
};

export const signOut = () => dispatch => {
  localStorage.clear();
  dispatch({
    type: SIGN_OUT
  });
};

export const getProfileFetch = () => dispatch => {
  const url = `${domain}/auth/profilefetch`;
  const token = localStorage.token;
  const body = {
    token
  };
  if (token !== undefined) {
    axios({
      method: "POST",
      url,
      data: body
    }).then(() => {
        dispatch({
          type: GET_PROFILE_FETCH,
          isAuthenticated: true
        });
    });
  } else {
    dispatch({
      type: GET_PROFILE_FETCH,
      isAuthenticated: false
    });
  }
};
