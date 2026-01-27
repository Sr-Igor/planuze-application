"use client";

import Cookies from "../config";
import { getModule } from "../modules/module";
import { getProfile } from "../modules/profile";

const unsubscribePush = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const unSub = async () => {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
        }
      };

      const timeOut = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Service worker is not ready.")), 1000)
      );

      await Promise.race([unSub(), timeOut]);
    } catch (error) {
      console.error("Error while invalidating push notification certificate:", error);
    }
  }
};

export const useClean = (callback?: boolean) => {
  const clean = async (redirect?: string) => {
    const moduleId = getModule();
    const profileId = getProfile();

    await unsubscribePush();

    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_LOCAL!);

    cleanCookies();

    const rawPath = window.location.pathname?.split("/")?.filter((p) => !!p);
    const currentPath = rawPath?.slice(1).join("/");

    if (redirect) {
      window.location.href = redirect;
    } else {
      window.location.href = callback
        ? `/auth/login?callbackUrl=${currentPath}&moduleId=${moduleId}&profileId=${profileId}`
        : "/auth/login";
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
