import { store } from './../redux/store';

export const isUserAuthenticated = () => {
  const { auth } = store.getState();

  if (auth?.accessToken) return true;
  else return false;
};
