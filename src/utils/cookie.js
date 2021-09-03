/*
 * 참고 : https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11
 * General utils for managing cookies in Typescript.
 */

export function setCookie(name, value, expireDate) {
  let cookie = `${name}=${value}; path=/ `;
  if (expireDate != undefined) {
    cookie += `;expires= ${expireDate.toUTCString()};`;
  }

  document.cookie = cookie;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts && parts.length !== 2) return null;

  return parts
    .pop()
    .split(';')
    .shift();
}

export function deleteCookie(name) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}
