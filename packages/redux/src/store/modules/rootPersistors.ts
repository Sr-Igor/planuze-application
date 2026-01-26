import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

export const persistConfig = {
  key: process.env.NEXT_PUBLIC_REDUX_KEY!,
  storage,

  //Is persisted in local storage
  whitelist: ["user", "module", "warning", "admin"],

  //Is not persisted in local storage
  blacklist: [],
};
