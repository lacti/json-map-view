export const getMapUrlFromQueryString = () => {
  if (!window || !window.location || !window.location.search) {
    return null;
  }
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("map");
};
