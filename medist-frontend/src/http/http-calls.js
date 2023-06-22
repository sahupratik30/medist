import { BASE_URL } from "./../config/index";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePatchRequest,
  makePostRequest,
} from "./http-sevice";

// HTTP function to login the user
export const loginUser = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/login/`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to register the user
export const registerUser = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/register/`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to fetch all products
export const fetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/products/`, false)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to update user profile
export const updateUserProfile = (userId, payload) => {
  return new Promise((resolve, reject) => {
    makePatchRequest(`${BASE_URL}/profile/${userId}`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to add item to cart
export const addToCart = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/cart/`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to add item to cart
export const updateCart = (itemId, payload) => {
  return new Promise((resolve, reject) => {
    makePatchRequest(`${BASE_URL}/cart/${itemId}/`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to create cart payment
export const createPaymentCart = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/paymentcart/`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to get payment cart
export const getPaymentCart = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/paymentcart/`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

// HTTP function to remove cart item
export const removeFromCart = (productId, payload) => {
  return new Promise((resolve, reject) => {
    makeDeleteRequest(`${BASE_URL}/cart/${productId}/`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};
