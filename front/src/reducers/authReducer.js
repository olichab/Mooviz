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
  toastMsg: { title: "", text: "" },
  failedMsg: "",
  isRegister: false,
  isLogged: true ? true : false,
  pseudo: ""
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
        isLogged: action.isLogged,
        pseudo: action.pseudo,
        formSignIn: action.formSignIn
          ? action.formSignIn
          : { email: "", password: "" },
        failedMsg: action.failedMsg ? action.failedMsg : "",
        toastMsg: action.toastMsg ? action.toastMsg : { title: "", text: "" }
      };
    case SIGN_UP:
      return {
        ...state,
        formSignUp: action.formSignUp
          ? action.formSignUp
          : { email: "", pseudo: "", password: "", passwordBis: "" },
        failedMsg: action.failedMsg ? action.failedMsg : "",
        isRegister: action.isRegister,
        toastMsg: action.toastMsg ? action.toastMsg : { title: "", text: "" }
      };
    case SIGN_OUT:
      return {
        ...state,
        isLogged: action.isLogged
      };
    case GET_PROFILE_FETCH:
      return {
        ...state,
        pseudo: action.pseudo,
        isLogged: action.isLogged
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
