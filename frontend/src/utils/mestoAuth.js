export const BASE_URL = "https://api.javelin.nomoredomains.icu";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const _parseResponse = (res) => {
  if (res.ok) {
    console.log(res)
    return res.json();
  }
  return Promise.reject(console.log(res));
};

const _request = ({ url, options }) => {
  return fetch(url, options).then(_parseResponse);
};

export const register = (email, password) => {
  return _request({
    url: `${BASE_URL}/sign-up`,
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
    url: `${BASE_URL}/sign-in`,
    options: {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    },
  });
};

export const checkToken = (token) => {
  return _request({
    url: `${BASE_URL}/users/me`,
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        ...headers,
        token: token, 
      },
    },
  });
};
