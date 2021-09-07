export const getUrlParam = (name, defaultValue = '') => {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has(name) && Boolean(searchParams.get(name))) {
    return decodeURIComponent(searchParams.get(name));
  }

  return defaultValue;
}

export const getUrlParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
}