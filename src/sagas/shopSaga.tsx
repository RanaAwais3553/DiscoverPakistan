import { call, put } from "@redux-saga/core/effects";
import { navigation } from "../constants";
import { ShopActions } from "../constants/actionNames";
import { ROUTE } from "../navigation/routeNames";
import { makeFormData } from "../utilities";

//writeFunctionHere

function* getShopItemsRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.getShopItemsRequest);
    const { data } = response;

    if (data?.message === "success") {
      yield put(ShopActions.getShopItemsSuccess(data?.data));
    } else {
      yield put(ShopActions.getShopItemsFailure());
    }
  } catch (err) {
    yield put(ShopActions.getShopItemsFailure());
  }
}

function* onCheckOutRequest(api, action) {
  try {
    let { payload } = action;
    payload = makeFormData(payload);
    const response = yield call(api.onCheckOutRequest, payload);
    const { data } = response;

    let orderId = Math.floor(100000 + Math.random() * 900000);
    navigation.navigate(ROUTE.OrderSuccessful, { orderId: orderId + "" });
    if (data?.message === "success") {
      yield put(ShopActions.onCheckOutSuccess(data?.data));
    } else {
      yield put(ShopActions.onCheckOutFailure());
    }
  } catch (err) {
    yield put(ShopActions.onCheckOutFailure());
  }
}

export { getShopItemsRequest, onCheckOutRequest };
