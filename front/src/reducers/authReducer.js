import {
  UPDATE_FORM_SIGN_IN,
  UPDATE_FORM_SIGN_UP,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  GET_PROFILE_FETCH,
  RESET_TOAST_MESSAGE
} from "../actions/types";

const initialState = {
  formSignIn: { email: "", password: "" },
  formSignUp: { email: "", pseudo: "", password: "", passwordBis: "" },
  isAuthenticated: false,
  isRegister: false,
  msgFailedLogin: "",
  msgSignUp: "",
  pseudo: "",
  toastMsg: { title: "", text: "" }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORM_SIGN_IN:
      return {
        ...state,
        formSignIn: action.formSignIn
      };
    case UPDATE_FORM_SIGN_UP:
      return {
        ...state,
        formSignUp: action.formSignUp
      };
    case SIGN_IN:
      return {
        ...state,
        formSignIn: action.formSignIn,
        pseudo: action.pseudo,
        isAuthenticated: action.isAuthenticated,
        msgFailedLogin: action.msgFailedLogin,
        toastMsg: action.toastMsg
      };
    case SIGN_UP:
      return {
        ...state,
        formSignUp: action.formSignUp,
        msgSignUp: action.msgSignUp,
        isRegister: action.isRegister,
        toastMsg: action.toastMsg
      };
    case SIGN_OUT:
      return {
        ...state
      };
    case GET_PROFILE_FETCH:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        pseudo: action.pseudo
      };
    case RESET_TOAST_MESSAGE:
      return {
        ...state,
        toastMsg: action.toastMsg
      };
    default:
      return state;
  }
}
