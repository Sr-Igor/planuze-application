import type { notification_subscription } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Notification Subscription (Push Notifications) endpoints
 */
export const notificationSubscriptionEndpoint = {
  /**
   * Subscribe to push notifications
   */
  store: async (body: any) => {
    return handleRequest<notification_subscription>(
      "POST",
      "/api/private/notification_subscription/store",
      body
    );
  },

  /**
   * Get VAPID public key for push notifications
   */
  key: async () => {
    return handleRequest<{ key: string }>("GET", "/api/private/notification_subscription/key");
  },
};

export type NotificationSubscription = notification_subscription;

// Direct function exports for backwards compatibility
export const notificationSubscriptionStore = notificationSubscriptionEndpoint.store;
export const notificationSubscriptionKey = notificationSubscriptionEndpoint.key;
