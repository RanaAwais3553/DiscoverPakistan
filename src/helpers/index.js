import { URI } from "../constants";
import Api from "../constants/api";

export const getCartList = (callback) => {
  let payload = {
    path: URI.GET_CART_LIST,
    method: "post",
    data: {
      user_id: this.props.userData.user_id,
    },
  };
  Api(payload)
    .then((res) => {
      if (callback) {
        callback(res.data);
      }
    })
    .catch((err) => {
      alert("Unkown Err : " + err);
      callback(false);
    });
};

export const addInCart = (obj, callback) => {
  let payload = {
    path: URI.ADD_TO_CART,
    method: "post",
    data: {
      user_id: this.props.userData.user_id,
      ...obj,
    },
  };
  Api(payload)
    .then((res) => {
      if (callback) {
        callback(res.data);
      }
    })
    .catch((err) => {
      alert("Unkown Err : " + err);
      callback(false);
    });
};

export const removeFromCart = (callback) => {
  let payload = {
    path: URI.REMOVE_CART,
    method: "post",
    data: {
      user_id: this.props.userData.user_id,
    },
  };
  Api(payload)
    .then((res) => {
      if (callback) {
        callback(res.data);
      }
    })
    .catch((err) => {
      alert("Unkown Err : " + err);
      callback(false);
    });
};
