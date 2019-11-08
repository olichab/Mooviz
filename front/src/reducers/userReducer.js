import {
  GET_USER_INFOS,
  UPDATE_FORM_PROFILE,
  SAVE_UPDATE_PROFILE,
  RESET_TOAST_MESSAGE
} from "../actions/types";

const initialState = {
  loading: true,
  userInfos: { email: "", pseudo: "" },
  formProfile: {
    email: "",
    pseudo: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  },
  failedMsg: "",
  toastMsg: { title: "", text: "" }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFOS:
      return {
        ...state,
        loading: action.loading,
        userInfos: action.userInfos ? action.userInfos : {},
        formProfile: action.formProfile
      };
    case UPDATE_FORM_PROFILE:
      return {
        ...state,
        formProfile: action.formProfile
      };
    case SAVE_UPDATE_PROFILE:
      return {
        ...state,
        failedMsg: action.failedMsg ? action.failedMsg : "",
        toastMsg: action.toastMsg ? action.toastMsg : { title: "", text: "" }
      };
    case RESET_TOAST_MESSAGE:
      return {
        ...state,
        toastMsg: { title: "", text: "" }
      };
    default:
      return state;
  }
}
