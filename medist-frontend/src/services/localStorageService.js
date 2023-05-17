export function setToken(value) {
  localStorage.setItem("access_token", value.access);
  localStorage.setItem("refresh_token", value.refresh);
}

export function setUserName(value) {
  localStorage.setItem("username", value.username);
}

export function getUserName(value) {
  return localStorage.getItem("username");
}

export function removeUserName() {
  localStorage.removeItem("username");
}

export function getToken() {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  return { access_token, refresh_token };
}

export function removeToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
