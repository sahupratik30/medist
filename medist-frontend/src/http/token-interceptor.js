import { store } from "../redux/store";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;

    const { auth } = store.getState();

    if (auth?.accessToken) {
      token = auth.accessToken;
    }

    resolve(token);
  });
};