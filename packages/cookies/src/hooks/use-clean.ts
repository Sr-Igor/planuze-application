import Cookies from "../config";

// Função para remover o subscription do PushManager
const unsubscribePush = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
      }
    } catch (error) {
      console.error("Error while invalidating push notification certificate:", error);
    }
  }
};

export const useClean = (callback?: boolean) => {
  const clean = async (redirect?: string) => {
    await unsubscribePush();

    typeof window !== "undefined" && localStorage.clear();
    Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_LOCAL!);
    cleanCookies();
    const currentPath = window.location.pathname;

    if (redirect) {
      window.location.href = redirect;
    } else {
      window.location.href = callback ? `/auth/login?callbackUrl=${currentPath}` : "/auth/login";
    }
  };

  return { clean };
};

export const cleanCookies = () => {
  // Clean all cookies
  const cookies = Cookies.getAll();
  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
};
