/**
 * Push Notification Service
 * Handles unsubscribing from push notifications
 * 
 * @principle Single Responsibility - Only handles push notification management
 */
export const pushNotificationService = {
  /**
   * Unsubscribes from push notifications
   * Safe to call even if push is not supported or no subscription exists
   */
  async unsubscribe(): Promise<void> {
    // Check if we're in a browser environment with push support
    if (typeof navigator === "undefined") {
      return;
    }

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
      }
    } catch (error) {
      console.error("Error while invalidating push notification certificate:", error);
    }
  },
};
