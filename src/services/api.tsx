import apisauce from "apisauce";
import { URI } from "../constants";

const URL = {
  baseUrl: "https://discoverpakistan.tv/discoverpakistanroute/Mobile_app_api/",
  updatedUrl:
    "https://discoverpakistan.tv/discoverpakistanroute/Mobile_app_api/",
};

const create = (baseURL = URL.updatedUrl) => {
  // const token = await AsyncStorage.getItem('token');
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
    },

    timeout: 15000,
  });

  const setAuthToken = (token) => {
    if (token) {
      api.setHeader("Authorization", token);
    }
  };

  const signInRequest = (payload) => {
    return api.post(URI.LOGIN, payload);
  };

  const getVideoBySlugRequest = (payload,page) => {
    console.log("in api section page value is:!...",page)
    return api.get(`${URI.VIDEO_BY_SLUG + payload}&pageSize=${page*10}&pageNumber=${page}`);
  };

  const getFavoriteVideosRequest = (payload) => {
    return api.post(URI.GET_FAVORITE, payload);
  };

  const getWatchLaterVideosRequest = (payload) => {
    return api.post(URI.GET_WATCH_LATER, payload);
  };

  const searchVideosRequest = (payload) => {
    return api.post(URI.SEARCH, payload);
  };

  const resetPasswordRequest = (payload) => {
    return api.get(URI.RESET_PASSWORD + payload);
  };
  const signUpRequest = (payload) => {
    return api.post(URI.SIGNUP, payload);
  };

  const updateProfileRequest = (payload) => {
    return api.post(URI.UPDATE_PROFILE, payload);
  };

  const onVideoLikeDislike = (payload) => {
    return api.post(URI.VIDEO_LIKE_DISLIKE, payload);
  };

  const onCommentLikeDislike = (payload) => {
    return api.post(URI.COMMENT_LIKE_DISLIKE, payload);
  };

  const onFavoriteVideo = (payload, isFavorite) => {
    return api.post(isFavorite ? URI.RM_FAVORITE : URI.ADD_FAVORITE, payload);
  };

  const onAddToWatchLater = (payload, isWatched) => {
    return api.post(
      isWatched ? URI.REMOVE_WATCH_LATER : URI.ADD_WATCH_LATER,
      payload,
    );
  };

  const getShowsRequest = (payload) => {
    return api.post(URI.GET_SHOWS_DETAIL, payload);
  };

  const getShowsVideosRequest = (payload) => {
    console.log("params in api file is............",payload)
    return api.get(`${URI.GET_SINGLE_VIDEO}${payload}`);
  };

  const getAllCommentsRequest = (payload) => {
    return api.post(URI.GET_COMMENTS, payload);
  };

  const getShopItemsRequest = (payload) => {
    return api.post(URI.GET_MARCHANDIES_PRODUCT, payload);
  };

  const uploadContentRequest = (payload) => {
    return api.post(URI.UPLOAD_CONTRIBUTOR, payload);
  };

  const onCheckOutRequest = (payload) => {
    return api.post(URI.ORDER_PRODUCTS, payload);
  };

  const submitCommentRequest = (payload) => {
    return api.post(URI.DO_COMMENTS, payload);
  };

  const deleteCommentRequest = (payload) => {
    return api.post(URI.VIDEO_COMMENT_DEL, payload);
  };

  const getUserDetailsRequest = (payload) => {
    return api.post(URI.GET_USER_DETAILS, payload);
  };

  const updateCommentRequest = (payload) => {
    return api.post(URI.UPDATE_VIDEO_COMMENT, payload);
  };

  return {
    getShopItemsRequest,
    updateCommentRequest,
    getUserDetailsRequest,
    deleteCommentRequest,
    submitCommentRequest,
    onCheckOutRequest,
    uploadContentRequest,
    getAllCommentsRequest,
    signUpRequest,
    getShowsVideosRequest,
    getShowsRequest,
    onVideoLikeDislike,
    onCommentLikeDislike,

    searchVideosRequest,
    setAuthToken,

    getVideoBySlugRequest,
    signInRequest,
    resetPasswordRequest,
    updateProfileRequest,
    onFavoriteVideo,
    getFavoriteVideosRequest,
    onAddToWatchLater,
    getWatchLaterVideosRequest,
  };
};
export default {
  create,
};
