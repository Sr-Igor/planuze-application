"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useNotificationSubscription } from "@repo/api/web";
import { useModal } from "@repo/hooks";
import { useAppDispatch, useAuth } from "@repo/redux/hook";
import { set } from "@repo/redux/store/modules/module/actions";
import { urlToBase64 } from "@repo/utils";

function areSubscriptionsEqual(sub1: any, sub2: any) {
  if (!sub1 || !sub2) return false;
  return JSON.stringify(sub1) === JSON.stringify(sub2);
}

export const NotificationManager = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const profileId = searchParams.get("profile_id");
  const moduleId = searchParams.get("module_id");

  const dispatch = useAppDispatch();
  const { hasTwoAuth, user } = useAuth();
  const userSubscription = user?.notification_subscriptions?.[0]?.subscription;

  const { key, store } = useNotificationSubscription({});

  const { setModal } = useModal();

  useEffect(() => {
    const setupPushManager = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          await navigator.serviceWorker.register("/sw.js");
        } catch (error) {
          console.error("Fail to register service worker:", error);
        }
      } else {
        console.warn("Push notifications or Service Workers are not supported by this browser.");
      }
    };

    setupPushManager();
  }, []);

  useEffect(() => {
    user?.id && hasTwoAuth && handleSubscription();
  }, [user?.id, hasTwoAuth]);

  useEffect(() => {
    if (modal && user?.confirmed) {
      setModal({ [modal]: true });
      const params = new URLSearchParams(window.location.search);
      params.delete("modal");
      const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, [modal]);

  useEffect(() => {
    if (profileId && moduleId && user?.confirmed) {
      dispatch(set({ profileId: profileId }));
      dispatch(set({ moduleId: moduleId }));
      const params = new URLSearchParams(window.location.search);
      params.delete("profile_id");
      params.delete("module_id");
      const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, [profileId, moduleId]);

  const handleSubscription = async () => {
    if (isSubscribed) return;

    try {
      const permission = await window.Notification.requestPermission();
      if (permission !== "granted") return;

      const registration = await navigator.serviceWorker.ready;
      const localSubscription = await registration.pushManager.getSubscription();

      if (userSubscription && localSubscription) {
        if (localSubscription) {
          const areSubscripted = areSubscriptionsEqual(
            localSubscription.toJSON(),
            userSubscription
          );
          if (areSubscripted) {
            setIsSubscribed(true);
            return;
          }
        }
        setIsSubscribed(true);
        return;
      }

      const vapidPublic = await key.mutateAsync();

      if (!vapidPublic.key) throw new Error("Fail to get vapid public key");

      const applicationServerKey = urlToBase64(vapidPublic.key) as any;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      await store.mutateAsync({ subscription, force: true });

      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription notification error:", error);
    }
  };

  return null;
};
