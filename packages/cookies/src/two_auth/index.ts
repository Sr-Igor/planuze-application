import Cookies from "../";

export const getTwoAuth = () => {
  const local_token = Cookies.get(process.env.NEXT_PUBLIC_TWO_AUTH_LOCAL!);

  return local_token;
};

export const setTwoAuth = async (token: string) => {
  token && Cookies.set(process.env.NEXT_PUBLIC_TWO_AUTH_LOCAL!, token);
};
