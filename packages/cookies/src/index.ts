import Cookies from "js-cookie";

const expires = Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRE_DAYS || 0);

const options: Cookies.CookieAttributes = {
  expires,
};

const set = (key: string, value: string) => {
  Cookies.set(key, value, options);
};

const get = (key: string) => {
  return Cookies.get(key);
};

const getAll = () => {
  return Cookies.get();
};

const remove = (key: string) => {
  Cookies.remove(key);
};

export default {
  set,
  get,
  getAll,
  remove,
  options,
};
