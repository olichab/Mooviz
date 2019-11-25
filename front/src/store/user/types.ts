export interface IUserInfos {
  email: string;
  pseudo: string;
}

export interface IFormProfile {
  email: string;
  pseudo: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IToastMsg {
  title: string;
  text: string;
}

export interface IUserState {
  loading: boolean;
  userInfos: IUserInfos;
  formProfile: IFormProfile;
  failedMsg: string;
  toastMsg: IToastMsg;
}

export const GET_USER_INFOS = 'GET_USER_INFOS';
export const UPDATE_FORM_PROFILE = 'UPDATE_FORM_PROFILE';
export const SAVE_UPDATE_PROFILE = 'SAVE_UPDATE_PROFILE';
export const SAVE_UPDATE_PROFILE_ERROR = 'SAVE_UPDATE_PROFILE_ERROR';
export const RESET_TOAST_MESSAGE = 'RESET_TOAST_MESSAGE';

interface IGetUserInfosAction {
  type: typeof GET_USER_INFOS;
  loading: boolean;
  userInfos: IUserInfos;
  formProfile: IFormProfile;
}

interface IUpdateFormProfileAction {
  type: typeof UPDATE_FORM_PROFILE;
  formProfile: IFormProfile;
}

interface ISaveUpdateProfileAction {
  type: typeof SAVE_UPDATE_PROFILE;
  formProfile: IFormProfile;
  toastMsg: IToastMsg;
}

interface ISaveUpdateProfileErrorAction {
  type: typeof SAVE_UPDATE_PROFILE_ERROR;
  failedMsg: string;
}

interface IResetToastMessageAction {
  type: typeof RESET_TOAST_MESSAGE;
  toastMsg: IToastMsg;
}

export type UserActionTypes =
  | IGetUserInfosAction
  | IUpdateFormProfileAction
  | ISaveUpdateProfileAction
  | ISaveUpdateProfileErrorAction
  | IResetToastMessageAction;
