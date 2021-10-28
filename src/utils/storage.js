const { localStorage } = window;

const EPD_KEY = '_expirationDate';

export const setWithExpire = (
  name,
  data,
  expire = 1000 * 60 * 60 * 24, // default: 1Day
) => {
  const unix = Date.now() + expire;

  set(name, data);
  set(name + EPD_KEY, unix);
};

export const getWithExpire = name => {
  const unix = get(name + EPD_KEY);
  const expire = Boolean(unix) && unix < Date.now();

  return expire ? null : get(name);
};

export const remove = (name) => {
  try {
    localStorage.removeItem(name);
    return true;
  }
  catch (err) {
    console.error(
      'removeStorage: Error removing key [' + name + '] from localStorage: ' +
      JSON.stringify(err));
  }
  return false;
};

function get (name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  }
  catch (err) {
    console.error(
      'getStorage: Error reading key [' + name + '] from localStorage: ' +
      JSON.stringify(err));
  }
  return null;
};

function set (name, value) {
  try {
    localStorage.setItem(name, JSON.stringify(value));
    return true;
  }
  catch (err) {
    console.error(
      'setStorage: Error setting key [' + name + '] in localStorage: ' +
      JSON.stringify(err));
  }
  return false;
};