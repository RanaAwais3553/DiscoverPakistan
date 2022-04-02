import cloneDeep from "lodash/cloneDeep";
import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addToCart: ["data"],

  clearCart: null,
  removeFromCart: ["data"],
  getShopItemsRequest: ["payload"],
  getShopItemsSuccess: ["data"],
  getShopItemsFailure: null,

  onCheckOutRequest: ["payload"],
  onCheckOutSuccess: ["data"],
  onCheckOutFailure: null,
});

export const ShopTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  getShopItems: {
    data: null,
    loading: true,
  },

  cart: [],
  onCheckOut: {
    data: null,
    loading: false,
  },
});

/* ------------- Selectors ------------- */

export const ShopSelectors = {
  getShopItems: (state) => state.getShopItems,
  cart: (state) => state.cart,
  onCheckOut: (state) => state.onCheckOut,
};

/* ------------- Reducers ------------- */

const getShopItemsRequest = (state, { payload }) => {
  return state.merge({
    getShopItems: {
      ...state.getShopItems,
      loading: true,
    },
  });
};

export const getShopItemsSuccess = (state, { data }) => {
  return state.merge({
    getShopItems: {
      ...state.getShopItems,
      loading: false,
      data: data,
    },
  });
};

export const getShopItemsFailure = (state) => {
  return state.merge({
    getShopItems: {
      ...state.getShopItems,
      loading: false,
    },
  });
};

const addToCart = (state, { data }) => {
  let itemAlreadyAdded = false;

  let newCart = cloneDeep(state.cart).map((item) => {
    item.cartQuantity = item?.cartQuantity || 1;
    if (item?.product_id === data?.product_id) {
      itemAlreadyAdded = true;

      if (item?.cartQuantity) {
        item.cartQuantity += data?.cartQuantity ? data?.cartQuantity : 1;
      } else {
        item.cartQuantity = data?.cartQuantity || 1;
      }
    }

    return item;
  });

  return state.merge({
    cart: itemAlreadyAdded ? [...newCart] : [...state.cart, data],
  });
};

const removeFromCart = (state, { data }) => {
  let cart = state.cart.filter((item) => {
    return item?.product_id !== data?.product_id;
  });

  return state.merge({
    cart: cart,
  });
};

const clearCart = (state) => {
  return state.merge({
    cart: [],
  });
};

const onCheckOutRequest = (state, { payload }) => {
  return state.merge({
    onCheckOut: {
      ...state.onCheckOut,
      loading: true,
    },
  });
};

export const onCheckOutSuccess = (state, { data }) => {
  return state.merge({
    onCheckOut: {
      ...state.onCheckOut,
      loading: false,
      data: data,
    },
  });
};

export const onCheckOutFailure = (state) => {
  return state.merge({
    onCheckOut: {
      ...state.onCheckOut,
      loading: false,
    },
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SHOP_ITEMS_REQUEST]: getShopItemsRequest,
  [Types.GET_SHOP_ITEMS_SUCCESS]: getShopItemsSuccess,
  [Types.GET_SHOP_ITEMS_FAILURE]: getShopItemsFailure,

  [Types.ADD_TO_CART]: addToCart,
  [Types.CLEAR_CART]: clearCart,

  [Types.REMOVE_FROM_CART]: removeFromCart,

  [Types.ON_CHECK_OUT_REQUEST]: onCheckOutRequest,
  [Types.ON_CHECK_OUT_SUCCESS]: onCheckOutSuccess,
  [Types.ON_CHECK_OUT_FAILURE]: onCheckOutFailure,
});
