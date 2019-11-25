export interface IFormSignIn {
  email: string;
  password: string;
}

export interface IFormSignUp {
  email: string;
  pseudo: string;
  password: string;
  passwordBis: string;
}

export interface IToastMsg {
  title: string;
  text: string;
}

export interface IAuthState {
  formSignIn: IFormSignIn;
  formSignUp: IFormSignUp;
  failedMsg: string;
  isRegister: boolean;
  isLogged: boolean;
  pseudo: string;
  toastMsg: IToastMsg;
}

export const UPDATE_FORM_SIGN_IN = 'UPDATE_FORM_SIGN_IN';
export const UPDATE_FORM_SIGN_UP = 'UPDATE_FORM_SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_PROFILE_FETCH = 'GET_PROFILE_FETCH';
export const RESET_TOAST_MESSAGE = 'RESET_TOAST_MESSAGE';

interface IUpdateFormSignInAction {
  type: typeof UPDATE_FORM_SIGN_IN;
  formSignIn: IFormSignIn;
}

interface IUpdateFormSignUpAction {
  type: typeof UPDATE_FORM_SIGN_UP;
  formSignUp: IFormSignUp;
}

interface ISignInAction {
  type: typeof SIGN_IN;
  isLogged: boolean;
  pseudo: string;
  toastMsg: IToastMsg;
}

interface ISignInErrorAction {
  type: typeof SIGN_IN_ERROR;
  failedMsg: string;
}

interface ISignUpAction {
  type: typeof SIGN_UP;
  isRegister: boolean;
  toastMsg: IToastMsg;
}

interface ISignUpErrorAction {
  type: typeof SIGN_UP_ERROR;
  failedMsg: string;
}

interface ISignOutAction {
  type: typeof SIGN_OUT;
  isLogged: boolean;
  pseudo: string;
}

interface IGetProfileFetchAction {
  type: typeof GET_PROFILE_FETCH;
  isLogged: boolean;
  pseudo: string;
}

interface IResetToastMessageAction {
  type: typeof RESET_TOAST_MESSAGE;
  toastMsg: IToastMsg;
}

export type AuthActionTypes =
  | IUpdateFormSignInAction
  | IUpdateFormSignUpAction
  | ISignInAction
  | ISignInErrorAction
  | ISignUpAction
  | ISignUpErrorAction
  | ISignOutAction
  | IGetProfileFetchAction
  | IResetToastMessageAction;
