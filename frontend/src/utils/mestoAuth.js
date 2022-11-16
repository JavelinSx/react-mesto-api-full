export const BASE_URL = "https://api.javelin.nomoredomains.icu";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Origin: "https://javelin.nomoredomains.icu"
};

const _parseResponse = (res) => {

  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}`);
};

const _request = ({ url, options }) => {
  return fetch(url, options).then(_parseResponse);
};

export const register = (email, password) => {
  return _request({
    url: `${BASE_URL}/signup`,
    options: {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    },
  });
};

export const login = (email, password) => {
  return _request({
    url: `${BASE_URL}/signin`,
    options: {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    },
  });
};

export const logout = () => {
  return _request({
    url: `${BASE_URL}/signout`,
    options: {
      method: "GET",
      credentials: "include",
      headers: headers
    },
  });
};
