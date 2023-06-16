import { BASE_URL } from "./../config/index";
import {
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
