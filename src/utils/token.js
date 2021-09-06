import { useContext } from 'react';
import GlobalContext from '../context/global.context';

const EXPIRATION_KEY = '_expirationDate';

export const KEY = {
  ACCESS_TOKEN: 'accessToken',
  GUEST_TOKEN: 'guestToken',
}

export const setItem = (name, value, expire = 60 * 5 * 1000) => {
  const data = JSON.stringify(value);

  try {
    window.localStorage.setItem(name, data);
    if (expire) {
      const expireUnixTime = (Date.now() + expire).toString();
      window.localStorage.setItem(name + EXPIRATION_KEY, expireUnixTime);
    }
    return true;
  } catch (err) {
    console.error('setStorage: Error setting key [' + name + '] in localStorage: ' + JSON.stringify(err));
    return false;
  }
};

export const getItem = (name, checkExpire = true) => {
  if (!name) return null;

  try {
    if (checkExpire) {
      const expireUnixTime = window.localStorage.getItem(name + EXPIRATION_KEY);
      const expire = !!expireUnixTime && expireUnixTime < Date.now();
      return expire ? null : JSON.parse(window.localStorage.getItem(name));
    }
    return JSON.parse(window.localStorage.getItem(name));
  } catch (err) {
    console.error('getStorage: Error reading key [' + name + '] from localStorage: ' + JSON.stringify(err));
    return null;
  }
};

export const removeItem = (name) => {
  try {
    window.localStorage.removeItem(name);
    window.localStorage.removeItem(name + EXPIRATION_KEY);
    return true;
  } catch (err) {
    console.error('removeStorage: Error removing key [' + name + '] from localStorage: ' + JSON.stringify(err));
    return false;
  }
}

export const setAccessToken = (accessToken, expireSeconds) => {
  setItem(KEY.ACCESS_TOKEN, accessToken, expireSeconds * 1000);
}

export const getAccessToken = () => {
  return getItem(KEY.ACCESS_TOKEN) ?? '';
}

export const removeAccessToken = () => {
  removeItem(KEY.ACCESS_TOKEN);
  // removeItem(oauthProvider);
  // removeItem(oauthToken);
};

export const setGuestToken = (guestToken) => {
  return setItem(KEY.GUEST_TOKEN, guestToken);
};

export const getGuestToken = () => {
  return getItem(KEY.GUEST_TOKEN) ?? '';
};
