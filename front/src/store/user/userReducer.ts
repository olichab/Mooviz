import {
  IUserState,
  GET_USER_INFOS,
  UPDATE_FORM_PROFILE,
  SAVE_UPDATE_PROFILE,
  SAVE_UPDATE_PROFILE_ERROR,
  RESET_TOAST_MESSAGE,
  UserActionTypes,
} from './types';

const initialState: IUserState = {
  loading: true,
  userInfos: { email: '', pseudo: '' },
  formProfile: {
    email: '',
    pseudo: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  },
  failedMsg: '',
  toastMsg: { title: '', text: '' },
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes,
): IUserState {
  switch (action.type) {
    case GET_USER_INFOS:
      return {
        ...state,
        loading: action.loading,
        userInfos: action.userInfos,
        formProfile: action.formProfile,
      };
    case UPDATE_FORM_PROFILE:
      return {
        ...state,
        formProfile: action.formProfile,
      };
    case SAVE_UPDATE_PROFILE:
      return {
        ...state,
        formProfile: {
          email: state.formProfile.email,
          pseudo: state.formProfile.pseudo,
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        },
        toastMsg: action.toastMsg,
      };
    case SAVE_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        failedMsg: action.failedMsg ? action.failedMsg : '',
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
