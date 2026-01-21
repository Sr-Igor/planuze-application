import type { notification_subscription } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Notification Subscription Types
// =============================================================================

/**
 * Body type for notification subscription store
 * Note: The endpoint type says 'subscription: string' but the frontend sends PushSubscription object
 * which gets serialized. We use a union type to match actual usage.
 */
export type NotificationSubscriptionStoreBody = {
  subscription: PushSubscription | string;
  force?: boolean | string;
};

/**
 * Notification Subscription (Push Notifications) endpoints
 */
export const notificationSubscriptionEndpoint = {
  /**
   * Subscribe to push notifications
   */
  store: (body: NotificationSubscriptionStoreBody) =>
    typedRequest<notification_subscription>()({
      route: "/api/private/notification_subscription/store",
      body: body as any,
    }),

  /**
   * Get VAPID public key for push notifications
   */
  key: () =>
    typedRequest<{ key: string }>()({
      route: "/api/private/notification_subscription/key",
    }),
};

export type NotificationSubscription = notification_subscription;

// Direct function exports for backwards compatibility
export const notificationSubscriptionStore = notificationSubscriptionEndpoint.store;
export const notificationSubscriptionKey = notificationSubscriptionEndpoint.key;
