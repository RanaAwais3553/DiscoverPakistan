import { call, put } from "redux-saga/effects";
import { VideoTypes } from "../constants";
import { MainActions } from "../constants/actionNames";
import { SCREEN_NAME } from "../constants/screenNames";
import Api from "../services/api";
import { makeFormData, sortComments } from "../utilities";
const api = Api.create();

//writeFunctionHere

function* getVideoBySlugRequest(api, action) {
  try {
    const { payload, screen,page } = action;
    console.log("payload data is:!,,,,...",payload,api,action,page)
    const response = yield call(api.getVideoBySlugRequest, payload,page);
    const { data } = response;
    console.log("success message in getVideo by success",data)
    if (data?.message === "success") {
      console.log("Success message called")
      yield put(
        MainActions.getVideoBySlugSuccess(
          data?.data,
          action.payload === VideoTypes.mostViewed && screen
            ? screen !== SCREEN_NAME.Home
            : true,
        ),
      );
    } else {
      yield put(MainActions.getVideoBySlugFailure());
    }
  } catch (err) {
    yield put(MainActions.getVideoBySlugFailure());
  }
}

function* searchVideosRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.searchVideosRequest, payload);
    const { data } = response;

    if (data?.movie) {
      yield put(MainActions.searchVideosSuccess(data?.movie));
    } else {
      yield put(MainActions.searchVideosFailure());
    }
  } catch (err) {
    yield put(MainActions.searchVideosFailure());
  }
}

function* getFavoriteVideosRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.getFavoriteVideosRequest, payload);
    const { data } = response;
    if (data) {
      yield put(MainActions.getVideoBySlugSuccess(data));
    } else {
      yield put(MainActions.getVideoBySlugFailure());
    }
  } catch (err) {
    yield put(MainActions.getVideoBySlugFailure());
  }
}

function* getWatchLaterVideosRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.getWatchLaterVideosRequest, payload);
    const { data } = response;
    // console.log("get watch latter video response",data.status , data.message)
    if (data) {
      yield put(MainActions.getVideoBySlugSuccess(data));
    } else {
      yield put(MainActions.getVideoBySlugFailure());
    }
  } catch (err) {
    console.log("error is:,",err)
    yield put(MainActions.getVideoBySlugFailure());
  }
}

const onFavoriteVideo = async (payload) => {
  console.log("favourite video data is:!...",payload.data)
  try {
    let isFavorite = payload?.isFavorite;
   let payloads = makeFormData(payload?.data);
    const response = await api.onFavoriteVideo(payloads, isFavorite);
     console.log("response in action is:",response.data)
    return response.data;
  } catch (error) {
    alert(JSON.stringify(error, null, 8));
  }
};

const onVideoLikeDislike = async (payload) => {
  try {
    payload = makeFormData(payload);
    const response = await api.onVideoLikeDislike(payload);

    return response.data;
  } catch (error) {
    alert(JSON.stringify(error, null, 8));
  }
};

const onCommentLikeDislike = async (payload) => {
  try {
    payload = makeFormData(payload);
    const response = await api.onCommentLikeDislike(payload);

    return response.data;
  } catch (error) {
    alert(JSON.stringify(error, null, 8));
  }
};

const onAddToWatchLater = async (payload) => {
  try {
    let isWatched = payload?.isWatched;
    payload = makeFormData(payload?.data);
    const response = await api.onAddToWatchLater(payload, isWatched);

    return response.data;
  } catch (error) {
    alert(JSON.stringify(error, null, 8));
  }
};

function* getShowsRequest(api, action) {
  try {
    let { payload } = action;

    payload = makeFormData(payload);
    const response = yield call(api.getShowsRequest, payload);
    const { data } = response;

    if (data?.message === "success") {
      yield put(MainActions.getVideoBySlugSuccess(data?.data));
    } else {
      yield put(MainActions.getVideoBySlugFailure());
    }
  } catch (err) {
    yield put(MainActions.getVideoBySlugFailure());
  }
}

function* getShowsVideosRequest(api, action) {
  try {
    let { payload } = action;
    console.log("getshows video request is:!....",payload)
   // payload = makeFormData(payload);
    const response = yield call(api.getShowsVideosRequest, payload);
    const { data } = response;
    console.log("get shows video request is:!.....",data?.data)
    if (data?.message === "success") {
      console.log("videos success")
      yield put(MainActions.getVideoBySlugSuccess());
    } else {
      alert(data?.message);
      yield put(MainActions.getVideoBySlugFailure());
    }
  } catch (err) {
    yield put(MainActions.getVideoBySlugFailure());
  }
}

function* uploadContentRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.uploadContentRequest, payload);
    const { data } = response;
    if (data?.message === "success") {
      yield put(MainActions.uploadContentSuccess(data?.data));
    } else {
      yield put(MainActions.uploadContentFailure());
    }
  } catch (err) {
    yield put(MainActions.uploadContentFailure());
  }
}

function* submitCommentRequest(api, action) {
  try {
    let { payload, onSuccess } = action;
    payload = makeFormData(payload);
    const response = yield call(api.submitCommentRequest, payload);
    const { data } = response;

    if (data?.message === "success") {
      yield put(MainActions.submitCommentSuccess(data?.data));
      let data2 = {
        v_id: action?.payload?.v_id,
        user_id: action?.payload?.user_id,
      };

      yield put(MainActions.getAllCommentsRequest(data2));

      onSuccess && onSuccess();
    } else {
      yield put(MainActions.submitCommentFailure());
    }
  } catch (err) {
    alert(err);
    yield put(MainActions.submitCommentFailure());
  }
}

function* deleteCommentRequest(api, action) {
  try {
    let { payload, videoId, onSuccess } = action;
    payload = makeFormData(payload);
    const response = yield call(api.deleteCommentRequest, payload);
    const { data } = response;
    if (data?.message === "success") {
      onSuccess && onSuccess();
      yield put(MainActions.deleteCommentSuccess(data?.data));

      let data2 = {
        v_id: videoId,
        user_id: action?.payload?.user_id,
      };
      yield put(MainActions.getAllCommentsRequest(data2));
    } else {
      yield put(MainActions.deleteCommentFailure());
    }
  } catch (err) {
    yield put(MainActions.deleteCommentFailure());
  }
}

function* getAllCommentsRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.getAllCommentsRequest, payload);
    const { data } = response;
    if (data) {
      let comments = sortComments(data);

      yield put(MainActions.getAllCommentsSuccess(comments));
    } else {
      yield put(MainActions.getAllCommentsFailure());
    }
  } catch (err) {
    yield put(MainActions.getAllCommentsFailure());
  }
}

function* updateCommentRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.updateCommentRequest, payload);
    const { data } = response;

    if (data?.message === "success") {
      yield put(MainActions.updateCommentSuccess(data?.data));
      let data2 = {
        v_id: action?.payload?.v_id,
        user_id: action?.payload?.user_id,
      };
      yield put(MainActions.getAllCommentsRequest(data2));
    } else {
      yield put(MainActions.updateCommentFailure());
    }
  } catch (err) {
    yield put(MainActions.updateCommentFailure());
  }
}
export {
  getVideoBySlugRequest,
  updateCommentRequest,
  getAllCommentsRequest,
  deleteCommentRequest,
  submitCommentRequest,
  onAddToWatchLater,
  searchVideosRequest,
  getFavoriteVideosRequest,
  getWatchLaterVideosRequest,
  onVideoLikeDislike,
  onFavoriteVideo,
  getShowsRequest,
  getShowsVideosRequest,
  uploadContentRequest,
  onCommentLikeDislike,
};
