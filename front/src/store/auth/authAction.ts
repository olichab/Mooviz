import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';

import {
  UPDATE_FORM_SIGN_IN,
  UPDATE_FORM_SIGN_UP,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGN_OUT,
  GET_PROFILE_FETCH,
} from './types';

const domain = process.env.REACT_APP_DOMAIN_NAME;

export const updateFormSignIn = (
  field: string,
  value: string,
  formSignIn: {
    email: string;
    password: string;
  },
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const form = formSignIn;
  switch (field) {
    case 'email':
      form.email = value;
      break;
    case 'password':
      form.password = value;
      break;
    default:
      break;
  }
  dispatch({
    type: UPDATE_FORM_SIGN_IN,
    formSignIn,
  });
};

export const updateFormSignUp = (
  field: string,
  value: string,
  formSignUp: {
    email: string;
    pseudo: string;
    password: string;
    passwordBis: string;
  },
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const form = formSignUp;
  switch (field) {
    case 'email':
      form.email = value;
      break;
    case 'pseudo':
      form.pseudo = value;
      break;
    case 'password':
      form.password = value;
      break;
    case 'passwordBis':
      form.passwordBis = value;
      break;
    default:
      break;
  }
  dispatch({
    type: UPDATE_FORM_SIGN_UP,
    formSignUp,
  });
};

export const signIn = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch, getState) => {
  const url = `${domain}/auth/signin`;
  const body = getState().auth.formSignIn;
  axios({
    method: 'POST',
    url,
    data: body,
  })
    .then((res) => {
      localStorage.setItem('token', res.headers['x-access-token']);
      dispatch({
        type: SIGN_IN,
        isLogged: true,
        pseudo: res.data,
        toastMsg: {
          title: 'Hello',
          text: 'Happy to see you again',
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: SIGN_IN_ERROR,
        failedMsg:
          error.response && error.response.data && error.response.data.message,
      });
    });
};

export const signUp = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch, getState) => {
  const url = `${domain}/auth/signup`;
  const body = getState().auth.formSignUp;
  axios({
    method: 'POST',
    url,
    data: body,
  })
    .then(() => {
      dispatch({
        type: SIGN_UP,
        isRegister: true,
        toastMsg: {
          title: 'Welcome',
          text: 'Happy to have you with us',
        },
      });
    })
    .catch((error) => {
      console.error('error', error);
      dispatch({
        type: SIGN_UP_ERROR,
        failedMsg:
          error.response && error.response.data && error.response.data.message,
      });
    });
};

export const signOut = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: SIGN_OUT,
    isLogged: false,
    pseudo: '',
  });
};

export const getProfileFetch = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch) => {
  const url = `${domain}/auth/profilefetch`;
  const token = localStorage.getItem('token');
  const body = { token };
  if (token) {
    axios({
      method: 'POST',
      url,
      data: body,
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: GET_PROFILE_FETCH,
            isLogged: true,
            pseudo: res.data,
          });
        }
      })
      .catch((error) => {
        console.error('error', error);
        localStorage.removeItem('token');
        dispatch({
          type: GET_PROFILE_FETCH,
          isLogged: false,
          pseudo: '',
        });
      });
  } else {
    dispatch({
      type: GET_PROFILE_FETCH,
      isLogged: false,
      pseudo: '',
    });
  }
};
