import { call, put } from "@redux-saga/core/effects";
import { navigation } from "../constants";
import { UserActions } from "../constants/actionNames";
import ASYNC_VAR from "../constants/asyncVariables";
import { ROUTE } from "../navigation/routeNames";
import { makeFormData, saveInAsyncStorage } from "../utilities";

//writeFunctionHere

function* signInRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.signInRequest, payload);

    const { data } = response;

    if (data?.message === "success") {
      saveInAsyncStorage(ASYNC_VAR.USER, data);
      yield put(UserActions.signInSuccess(data));
      navigation.navigate(ROUTE.Home);
    } else {
      alert(data?.data);
      yield put(UserActions.signInFailure());
    }
  } catch (err) {
    yield put(UserActions.signInFailure());
  }
}

function* resetPasswordRequest(api, action) {
  try {
    let { payload } = action;
    const response = yield call(api.resetPasswordRequest, payload);
    const { data } = response;
    alert(JSON.stringify(data?.message, null, 8));

    if (data?.message === "success") {
      yield put(UserActions.resetPasswordSuccess(data?.data));
    } else {
      yield put(UserActions.resetPasswordFailure());
    }
  } catch (err) {
    yield put(UserActions.resetPasswordFailure());
  }
}

function* signUpRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);

    const response = yield call(api.signUpRequest, payload);

    const { data } = response;

    if (data?.status === "success") {
      saveInAsyncStorage(ASYNC_VAR.USER, data);

      yield put(UserActions.signUpSuccess(data));
      navigation.navigate(ROUTE.Home);
    } else {
      alert(data?.data);
      yield put(UserActions.signUpFailure());
    }
  } catch (err) {
    yield put(UserActions.signUpFailure());
  }
}

function* updateProfileRequest(api, action) {
  try {
    let { payload, onSuccess } = action;

    payload = makeFormData(payload);
    const response = yield call(api.updateProfileRequest, payload);
    const { data } = response;

    if (data?.status === "success") {
      yield put(UserActions.updateProfileSuccess(data?.data));

      onSuccess && onSuccess();
    } else {
      yield put(UserActions.updateProfileFailure());
    }
  } catch (err) {
    yield put(UserActions.updateProfileFailure());
  }
}

function* getUserDetailsRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.getUserDetailsRequest, payload);
    const { data } = response;

    let user = data?.userInfo;
    user.image_url = user.img;

    if (data?.status === "success") {
      saveInAsyncStorage(ASYNC_VAR.USER, user);

      yield put(UserActions.getUserDetailsSuccess(user));
      yield put(UserActions.signInSuccess(user));
    } else {
      yield put(UserActions.getUserDetailsFailure());
    }
  } catch (err) {
    yield put(UserActions.getUserDetailsFailure());
  }
}

export {
  signInRequest,
  getUserDetailsRequest,
  resetPasswordRequest,
  signUpRequest,
  updateProfileRequest,
};
