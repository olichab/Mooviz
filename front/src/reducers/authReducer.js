import {
  UPDATE_FORM_SIGN_IN,
  UPDATE_FORM_SIGN_UP,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  GET_PROFILE_FETCH
} from "../actions/types";

const initialState = {
  formSignIn: { email: "", password: "" },
  formSignUp: { email: "", pseudo: "", password: "", passwordBis: "" },
  isAuthenticated: false,
  isRegister: false,
  msgFailedLogin:"",
  msgSignUp: "",
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
        formSignIn: action.formSignIn,
        pseudo: action.pseudo,
        isAuthenticated: action.isAuthenticated,
        msgFailedLogin: action.msgFailedLogin
      };
    case SIGN_UP:
      return {
        ...state,
        formSignUp: action.formSignUp,
        msgSignUp: action.msgSignUp,
        isRegister: action.isRegister
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
    default:
      return state;
  }
}
