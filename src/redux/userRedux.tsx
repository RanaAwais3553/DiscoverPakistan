import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import ASYNC_VAR from "../constants/asyncVariables";
import { saveInAsyncStorage } from "../utilities";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUser: ["payload"],
  signInRequest: ["payload"],
  signInSuccess: ["data"],
  signInFailure: null,
  onLogOut: null,
  onLogIn: ["payload"],

  resetPasswordRequest: ["payload"],
  resetPasswordSuccess: ["data"],
  resetPasswordFailure: null,
  signUpRequest: ["payload"],
  signUpSuccess: ["data"],
  signUpFailure: null,

  updateProfileRequest: ["payload", "onSuccess"],
  updateProfileSuccess: ["data"],
  updateProfileFailure: null,
  getUserDetailsRequest: ["payload"],
  getUserDetailsSuccess: ["data"],
  getUserDetailsFailure: null,
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: {},

  signIn: {
    loading: false,
  },
  isLoggedIn: false,
  isLoading: true,
  resetPassword: {
    data: null,
    loading: false,
  },

  signUp: {
    loading: false,
  },

  updateProfile: {
    data: null,
    loading: false,
  },
  getUserDetails: {
    data: null,
    loading: false,
  },
});

/* ------------- Selectors ------------- */

export const UserSelectors = {
  user: (state) => state.user,
  signIn: (state) => state.signIn,
  isLoggedIn: (state) => state.isLoggedIn,
  isLoading: (state) => state.isLoading,

  resetPassword: (state) => state.resetPassword,
  signUp: (state) => state.signUp,
  updateProfile: (state) => state.updateProfile,
  getUserDetails: (state) => state.getUserDetails,
};

/* ------------- Reducers ------------- */

// request the data from an api

export const setUser = (state, { payload }) => {
  return state.merge({
    user: {
      ...state.user,
      ...payload,
    },
  });
};

export const onLogOut = (state, { payload }) => {
  return state.merge({
    user: {},
    isLoggedIn: false,
    isLoading: false,
  });
};
export const onLogIn = (state, { payload }) => {
  saveInAsyncStorage(ASYNC_VAR.USER, payload);
  return state.merge({
    user: payload,
    isLoggedIn: true,
    isLoading: false,
  });
};

const signInRequest = (state, { payload }) => {
  return state.merge({
    signIn: {
      ...state.signIn,
      loading: true,
    },
  });
};

export const signInSuccess = (state, { data }) => {
  return state.merge({
    signIn: {
      ...state.signIn,
      loading: false,
    },
    user: {
      ...data,
    },
    isLoggedIn: true,
    isLoading: false,
  });
};

export const signInFailure = (state) => {
  return state.merge({
    signIn: {
      ...state.signIn,
      loading: false,
    },
  });
};

const resetPasswordRequest = (state, { payload }) => {
  return state.merge({
    resetPassword: {
      ...state.resetPassword,
      loading: true,
    },
  });
};

export const resetPasswordSuccess = (state, { data }) => {
  return state.merge({
    resetPassword: {
      ...state.resetPassword,
      loading: false,
      data: data,
    },
  });
};

export const resetPasswordFailure = (state) => {
  return state.merge({
    resetPassword: {
      ...state.resetPassword,
      loading: false,
    },
  });
};

const signUpRequest = (state, { payload }) => {
  return state.merge({
    signUp: {
      ...state.signUp,
      loading: true,
    },
  });
};

export const signUpSuccess = (state, { data }) => {
  return state.merge({
    signUp: {
      ...state.signUp,
      loading: false,
    },
    user: {
      ...state.user,
      ...data,
    },
    isLoggedIn: true,
    isLoading: false,
  });
};

export const signUpFailure = (state) => {
  return state.merge({
    signUp: {
      ...state.signUp,
      loading: false,
    },
  });
};

const updateProfileRequest = (state, { payload }) => {
  return state.merge({
    updateProfile: {
      ...state.updateProfile,
      loading: true,
    },
  });
};

export const updateProfileSuccess = (state, { data }) => {
  return state.merge({
    updateProfile: {
      ...state.updateProfile,
      loading: false,
      data: data,
    },
  });
};

export const updateProfileFailure = (state) => {
  return state.merge({
    updateProfile: {
      ...state.updateProfile,
      loading: false,
    },
  });
};

const getUserDetailsRequest = (state, { payload }) => {
  return state.merge({
    getUserDetails: {
      ...state.getUserDetails,
      loading: true,
    },
  });
};

export const getUserDetailsSuccess = (state, { data }) => {
  return state.merge({
    getUserDetails: {
      ...state.getUserDetails,
      loading: false,
      data: data,
    },
  });
};

export const getUserDetailsFailure = (state) => {
  return state.merge({
    getUserDetails: {
      ...state.getUserDetails,
      loading: false,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,

  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,

  [Types.ON_LOG_OUT]: onLogOut,
  [Types.ON_LOG_IN]: onLogIn,

  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,

  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,

  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,

  [Types.GET_USER_DETAILS_REQUEST]: getUserDetailsRequest,
  [Types.GET_USER_DETAILS_SUCCESS]: getUserDetailsSuccess,
  [Types.GET_USER_DETAILS_FAILURE]: getUserDetailsFailure,
});
