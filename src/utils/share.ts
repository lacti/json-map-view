import lz from "lzutf8";

const getCurrentUrl = () => {
  if (!window || !window.location) {
    throw new Error(`Invalid window.location`);
  }
  const currentUrl = window.location.href;
  if (!currentUrl) {
    throw new Error(`Invalid window.location.href`);
  }
  return currentUrl;
};

const buildShareUrl = <T>(state: T) => {
  const currentUrl = getCurrentUrl();
  const hashIndex = currentUrl.indexOf("#");
  return (
    (hashIndex >= 0 ? currentUrl.substring(0, hashIndex) : currentUrl) +
    "#" +
    lz.compress(JSON.stringify(state), { outputEncoding: "Base64" })
  );
};

const gotoShareUrl = <T>(state: T) =>
  window.location.replace(buildShareUrl(state));

const getStateFromUrl = <T>(): T | null => {
  const currentUrl = getCurrentUrl();
  const hashIndex = currentUrl.indexOf("#");
  if (hashIndex < 0) {
    return null;
  }
  try {
    return JSON.parse(
      lz.decompress(currentUrl.substring(hashIndex + 1), {
        inputEncoding: "Base64"
      })
    ) as T;
  } catch (error) {
    console.error(`Invalid state at URL`, error);
    return null;
  }
};

export const useStateFromUrl = <T>(): [
  T | null,
  (newValue: Partial<T> | null) => void
] => {
  const value = getStateFromUrl<T>();
  return [
    value,
    (newValue: Partial<T> | null) =>
      gotoShareUrl({ ...(value || {}), ...(newValue || {}) })
  ];
};
