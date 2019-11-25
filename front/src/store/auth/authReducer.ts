import {
  IAuthState,
  UPDATE_FORM_SIGN_IN,
  UPDATE_FORM_SIGN_UP,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGN_OUT,
  GET_PROFILE_FETCH,
  RESET_TOAST_MESSAGE,
  AuthActionTypes,
} from './types';

const initialState: IAuthState = {
  formSignIn: { email: '', password: '' },
  formSignUp: {
    email: '',
    pseudo: '',
    password: '',
    passwordBis: '',
  },
  isRegister: false,
  isLogged: !!true,
  pseudo: '',
  failedMsg: '',
  toastMsg: { title: '', text: '' },
};

export default function authReducer(
  state = initialState,
  action: AuthActionTypes,
): IAuthState {
  switch (action.type) {
    case UPDATE_FORM_SIGN_IN:
      return {
        ...state,
        formSignIn: action.formSignIn,
      };
    case UPDATE_FORM_SIGN_UP:
      return {
        ...state,
        formSignUp: action.formSignUp,
      };
    case SIGN_IN:
      return {
        ...state,
        isLogged: action.isLogged,
        pseudo: action.pseudo,
        toastMsg: action.toastMsg,
        formSignIn: { email: '', password: '' },
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        failedMsg: action.failedMsg,
      };
    case SIGN_UP:
      return {
        ...state,
        isRegister: action.isRegister,
        toastMsg: action.toastMsg,
        formSignUp: {
          email: '',
          pseudo: '',
          password: '',
          passwordBis: '',
        },
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        failedMsg: action.failedMsg,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLogged: action.isLogged,
        pseudo: action.pseudo,
      };
    case GET_PROFILE_FETCH:
      return {
        ...state,
        pseudo: action.pseudo,
        isLogged: action.isLogged,
      };
    case RESET_TOAST_MESSAGE:
      return {
        ...state,
        toastMsg: { title: '', text: '' },
      };
    default:
      return state;
  }
}
