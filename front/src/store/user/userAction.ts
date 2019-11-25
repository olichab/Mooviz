import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import {
  UPDATE_FORM_PROFILE,
  GET_USER_INFOS,
  SAVE_UPDATE_PROFILE,
  SAVE_UPDATE_PROFILE_ERROR,
} from './types';

const domain = process.env.REACT_APP_DOMAIN_NAME;

export const getUserInfos = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch) => {
  const url = `${domain}/users/`;
  const token = localStorage.getItem('token') || '';
  axios({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: GET_USER_INFOS,
        loading: false,
        userInfos: { email: res.data[0].email, pseudo: res.data[0].pseudo },
        formProfile: {
          email: res.data[0].email,
          pseudo: res.data[0].pseudo,
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        },
      });
    })
    .catch((error) => {
      console.error('error', error);
    });
};

export const updateFormProfile = (
  field: string,
  value: string,
  formProfile: {
    email: string;
    pseudo: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  },
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const form = formProfile;
  switch (field) {
    case 'email':
      form.email = value;
      break;
    case 'pseudo':
      form.pseudo = value;
      break;
    case 'oldPassword':
      form.oldPassword = value;
      break;
    case 'newPassword':
      form.newPassword = value;
      break;
    case 'confirmNewPassword':
      form.confirmNewPassword = value;
      break;
    default:
      break;
  }
  dispatch({
    type: UPDATE_FORM_PROFILE,
    formProfile,
  });
};

export const saveUpdateProfile = (): ThunkAction<
void,
AppState,
null,
Action<string>
> => async (dispatch, getState) => {
  const token = localStorage.getItem('token') || '';
  const url = `${domain}/users/`;
  const body = getState().user.formProfile;
  axios({
    method: 'PUT',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body,
  })
    .then((res) => {
      dispatch({
        type: SAVE_UPDATE_PROFILE,
        toastMsg: {
          title: 'Updated',
          text: res.data && res.data.message,
        },
      });
    })
    .catch((error) => {
      console.error('error', error);
      dispatch({
        type: SAVE_UPDATE_PROFILE_ERROR,
        failedMsg:
          error.response && error.response.data && error.response.data.message,
      });
    });
};
