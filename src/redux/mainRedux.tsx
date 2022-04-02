import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { SCREEN_NAME } from "../constants/screenNames";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getShowsRequest: ["payload"],
  getShowsVideosRequest: ["payload"],
  getVideoBySlugRequest: ["payload", "screen","page"],
  getVideoBySlugSuccess: ["data", "isMostViewed"],
  getVideoBySlugFailure: null,
  getFavoriteVideosRequest: ["payload"],
  getWatchLaterVideosRequest: ["payload"],
  searchVideosRequest: ["payload"],
  searchVideosSuccess: ["data"],
  searchVideosFailure: null,
  setCurrentDrawerScreen: ["payload"],

  uploadContentRequest: ["payload"],
  uploadContentSuccess: ["data"],
  uploadContentFailure: null,

  submitCommentRequest: ["payload", "onSuccess"],
  submitCommentSuccess: ["data"],
  submitCommentFailure: null,
  deleteCommentRequest: ["payload", "videoId", "onSuccess"],
  deleteCommentSuccess: ["data"],
  deleteCommentFailure: null,

  getAllCommentsRequest: ["payload"],
  getAllCommentsSuccess: ["data"],
  getAllCommentsFailure: null,

  updateCommentRequest: ["payload"],
  updateCommentSuccess: ["data"],
  updateCommentFailure: null,
});

export const MainTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getVideoBySlug: {
    data: null,
    loading: false,
  },

  searchVideos: {
    data: null,
    loading: false,
  },
  uploadContent: {
    data: null,
    loading: false,
  },

  currentDrawerScreen: SCREEN_NAME.Home,
  submitComment: {
    data: null,
    loading: false,
  },
  deleteComment: {
    data: null,
    loading: false,
  },
  getAllComments: {
    data: null,
    loading: false,
  },
  updateComment: {
    data: null,
    loading: false,
  },
});

/* ------------- Selectors ------------- */

export const MainSelectors = {
  getVideoBySlug: (state) => state.getVideoBySlug,
  searchVideos: (state) => state.searchVideos,
  currentDrawerScreen: (state) => state.currentDrawerScreen,
  uploadContent: (state) => state.uploadContent,
  submitComment: (state) => state.submitComment,
  deleteComment: (state) => state.deleteComment,
  getAllComments: (state) => state.getAllComments,
  updateComment: (state) => state.updateComment,
};

/* ------------- Reducers ------------- */

// request the data from an api

export const getVideoBySlugRequest = (state, { payload }) => {
  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: true,
    },
  });
};

export const getVideoBySlugSuccess = (state, { data, isMostViewed }) => {
  console.log("isMounted called in mainreducer",isMostViewed)
  if (!isMostViewed || isMostViewed) {
    console.log("isMounted called in mainreducersssss",isMostViewed)
    data = data.sort(
      (current, next) =>
        parseInt(current.video_views) < parseInt(next.video_views),
    );
  }

  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: false,
      data: data,
    },
  });
};

export const getVideoBySlugFailure = (state) => {
  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: false,
    },
  });
};

const searchVideosRequest = (state, { payload }) => {
  return state.merge({
    searchVideos: {
      ...state.searchVideos,
      loading: true,
      payload: payload,
    },
  });
};

export const searchVideosSuccess = (state, { data }) => {
  return state.merge({
    searchVideos: {
      ...state.searchVideos,
      loading: false,
      data: data,
    },
  });
};

export const searchVideosFailure = (state) => {
  return state.merge({
    searchVideos: {
      ...state.searchVideos,
      loading: false,
    },
  });
};

export const setCurrentDrawerScreen = (state, { payload }) => {
  return state.merge({
    currentDrawerScreen: payload,
  });
};

export const getFavoriteVideosRequest = (state, { payload }) => {
  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: true,
    },
  });
};

export const getWatchLaterVideosRequest = (state, { payload }) => {
  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: true,
    },
  });
};

export const getShowsRequest = (state, { payload }) => {
  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: true,
    },
  });
};

export const getShowsVideosRequest = (state, { payload }) => {
  return state.merge({
    getVideoBySlug: {
      ...state.getVideoBySlug,
      loading: true,
    },
  });
};

const uploadContentRequest = (state, { payload }) => {
  return state.merge({
    uploadContent: {
      ...state.uploadContent,
      loading: true,
    },
  });
};

export const uploadContentSuccess = (state, { data }) => {
  return state.merge({
    uploadContent: {
      ...state.uploadContent,
      loading: false,
      data: data,
    },
  });
};

export const uploadContentFailure = (state) => {
  return state.merge({
    uploadContent: {
      ...state.uploadContent,
      loading: false,
    },
  });
};

const submitCommentRequest = (state, { payload, onSuccess }) => {
  return state.merge({
    submitComment: {
      ...state.submitComment,
      loading: true,
    },
  });
};

export const submitCommentSuccess = (state, { data }) => {
  return state.merge({
    submitComment: {
      ...state.submitComment,
      loading: false,
      data: data,
    },
  });
};

export const submitCommentFailure = (state) => {
  return state.merge({
    submitComment: {
      ...state.submitComment,
      loading: false,
    },
  });
};

const deleteCommentRequest = (state, { payload }) => {
  return state.merge({
    deleteComment: {
      ...state.deleteComment,
      loading: true,
    },
  });
};

export const deleteCommentSuccess = (state, { data }) => {
  return state.merge({
    deleteComment: {
      ...state.deleteComment,
      loading: false,
      data: data,
    },
  });
};

export const deleteCommentFailure = (state) => {
  return state.merge({
    deleteComment: {
      ...state.deleteComment,
      loading: false,
    },
  });
};

const getAllCommentsRequest = (state, { payload }) => {
  return state.merge({
    getAllComments: {
      ...state.getAllComments,
      loading: true,
    },
  });
};

export const getAllCommentsSuccess = (state, { data }) => {
  return state.merge({
    getAllComments: {
      ...state.getAllComments,
      loading: false,
      data: data,
    },
  });
};

export const getAllCommentsFailure = (state) => {
  return state.merge({
    getAllComments: {
      ...state.getAllComments,
      loading: false,
    },
  });
};

const updateCommentRequest = (state, { payload }) => {
  return state.merge({
    updateComment: {
      ...state.updateComment,
      loading: true,
    },
  });
};

export const updateCommentSuccess = (state, { data }) => {
  return state.merge({
    updateComment: {
      ...state.updateComment,
      loading: false,
      data: data,
    },
  });
};

export const updateCommentFailure = (state) => {
  return state.merge({
    updateComment: {
      ...state.updateComment,
      loading: false,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_VIDEO_BY_SLUG_REQUEST]: getVideoBySlugRequest,
  [Types.GET_VIDEO_BY_SLUG_SUCCESS]: getVideoBySlugSuccess,
  [Types.GET_VIDEO_BY_SLUG_FAILURE]: getVideoBySlugFailure,

  [Types.GET_FAVORITE_VIDEOS_REQUEST]: getFavoriteVideosRequest,
  [Types.GET_WATCH_LATER_VIDEOS_REQUEST]: getWatchLaterVideosRequest,

  [Types.SEARCH_VIDEOS_REQUEST]: searchVideosRequest,
  [Types.SEARCH_VIDEOS_SUCCESS]: searchVideosSuccess,
  [Types.SEARCH_VIDEOS_FAILURE]: searchVideosFailure,

  [Types.SET_CURRENT_DRAWER_SCREEN]: setCurrentDrawerScreen,

  [Types.GET_SHOWS_REQUEST]: getShowsRequest,
  [Types.GET_SHOWS_VIDEOS_REQUEST]: getShowsVideosRequest,

  [Types.UPLOAD_CONTENT_REQUEST]: uploadContentRequest,
  [Types.UPLOAD_CONTENT_SUCCESS]: uploadContentSuccess,
  [Types.UPLOAD_CONTENT_FAILURE]: uploadContentFailure,

  [Types.SUBMIT_COMMENT_REQUEST]: submitCommentRequest,
  [Types.SUBMIT_COMMENT_SUCCESS]: submitCommentSuccess,
  [Types.SUBMIT_COMMENT_FAILURE]: submitCommentFailure,

  [Types.DELETE_COMMENT_REQUEST]: deleteCommentRequest,
  [Types.DELETE_COMMENT_SUCCESS]: deleteCommentSuccess,
  [Types.DELETE_COMMENT_FAILURE]: deleteCommentFailure,

  [Types.GET_ALL_COMMENTS_REQUEST]: getAllCommentsRequest,
  [Types.GET_ALL_COMMENTS_SUCCESS]: getAllCommentsSuccess,
  [Types.GET_ALL_COMMENTS_FAILURE]: getAllCommentsFailure,

  [Types.UPDATE_COMMENT_REQUEST]: updateCommentRequest,
  [Types.UPDATE_COMMENT_SUCCESS]: updateCommentSuccess,
  [Types.UPDATE_COMMENT_FAILURE]: updateCommentFailure,
});
