import Cookies from "@/hooks/cookies";
import { getTabId } from "@/hooks/tab";

export const getProfile = () => {
  const tabId = getTabId();
  const local_token = Cookies.get(`${process.env.NEXT_PUBLIC_PROFILE_LOCAL!}-${tabId}`);

  return local_token;
};

export const setProfile = async (token: string) => {
  const tabId = getTabId();
  token && Cookies.set(`${process.env.NEXT_PUBLIC_PROFILE_LOCAL!}-${tabId}`, token);
};
