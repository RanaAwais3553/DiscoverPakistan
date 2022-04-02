import { all, takeLatest } from "@redux-saga/core/effects";
import { MainTypes } from "../redux/mainRedux";
import { ShopTypes } from "../redux/shopRedux";
import { UserTypes } from "../redux/userRedux";
import API from "../services/api";
import * as mainSaga from "./mainSaga";
import * as shopSaga from "./shopSaga";
import * as userSaga from "./userSaga";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  //writeHere
  //yield all([takeLatest(AuthTypes.LOGIN_REQUEST, userSaga.setUser, api)]);

  yield all([
    takeLatest(
      MainTypes.GET_VIDEO_BY_SLUG_REQUEST,
      mainSaga.getVideoBySlugRequest,
      api,
    ),
    takeLatest(
      MainTypes.SEARCH_VIDEOS_REQUEST,
      mainSaga.searchVideosRequest,
      api,
    ),

    takeLatest(
      UserTypes.RESET_PASSWORD_REQUEST,
      userSaga.resetPasswordRequest,
      api,
    ),

    takeLatest(
      UserTypes.UPDATE_PROFILE_REQUEST,
      userSaga.updateProfileRequest,
      api,
    ),

    takeLatest(
      MainTypes.GET_FAVORITE_VIDEOS_REQUEST,
      mainSaga.getFavoriteVideosRequest,
      api,
    ),

    takeLatest(
      MainTypes.GET_WATCH_LATER_VIDEOS_REQUEST,
      mainSaga.getWatchLaterVideosRequest,
      api,
    ),

    takeLatest(
      MainTypes.GET_SHOWS_VIDEOS_REQUEST,
      mainSaga.getShowsVideosRequest,
      api,
    ),

    takeLatest(MainTypes.GET_SHOWS_REQUEST, mainSaga.getShowsRequest, api),

    takeLatest(UserTypes.SIGN_UP_REQUEST, userSaga.signUpRequest, api),

    takeLatest(UserTypes.SIGN_IN_REQUEST, userSaga.signInRequest, api),

    takeLatest(
      ShopTypes.GET_SHOP_ITEMS_REQUEST,
      shopSaga.getShopItemsRequest,
      api,
    ),

    takeLatest(ShopTypes.ON_CHECK_OUT_REQUEST, shopSaga.onCheckOutRequest, api),

    takeLatest(
      MainTypes.UPLOAD_CONTENT_REQUEST,
      mainSaga.uploadContentRequest,
      api,
    ),

    takeLatest(
      MainTypes.SUBMIT_COMMENT_REQUEST,
      mainSaga.submitCommentRequest,
      api,
    ),

    takeLatest(
      MainTypes.DELETE_COMMENT_REQUEST,
      mainSaga.deleteCommentRequest,
      api,
    ),

    takeLatest(
      UserTypes.GET_USER_DETAILS_REQUEST,
      userSaga.getUserDetailsRequest,
      api,
    ),

    takeLatest(
      MainTypes.GET_ALL_COMMENTS_REQUEST,
      mainSaga.getAllCommentsRequest,
      api,
    ),

    takeLatest(
      MainTypes.UPDATE_COMMENT_REQUEST,
      mainSaga.updateCommentRequest,
      api,
    ),
  ]);
}
