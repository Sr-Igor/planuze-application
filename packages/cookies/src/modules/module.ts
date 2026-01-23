import Cookies from "../config";
import { getTabId } from "../hooks/use-tab-id";

export const getModule = () => {
  const tabId = getTabId();

  const local_token = Cookies.get(`${process.env.NEXT_PUBLIC_MODULE_LOCAL}-${tabId}`);

  return local_token;
};

export const setModule = async (token: string) => {
  const tabId = getTabId();
  token && Cookies.set(`${process.env.NEXT_PUBLIC_MODULE_LOCAL}-${tabId}`, token);
};
