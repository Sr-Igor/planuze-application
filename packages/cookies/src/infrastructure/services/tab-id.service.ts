import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * BroadcastChannel for multi-tab communication
 */
let channel: InstanceType<typeof BroadcastChannel> | null = null;

if (typeof globalThis.window !== "undefined" && typeof BroadcastChannel !== "undefined") {
  channel = new BroadcastChannel("tab_id_broadcast_channel");
}


/**
 * Tab ID Service
 * Manages unique identifiers for browser tabs to isolate certain cookies per tab
 * 
 * @principle Single Responsibility - Only handles tab identification
 */
export const tabIdService = {
  /**
   * Gets the current tab ID from sessionStorage
   * Returns null if running on server
   */
  getTabId(): string | null {
    if (typeof globalThis.window === "undefined") {
      return null;
    }
    return sessionStorage.getItem(COOKIE_KEYS.TAB_ID);
  },

  /**
   * Sets a new tab ID in sessionStorage
   */
  setTabId(id: string): void {
    if (typeof globalThis.window === "undefined") {
      return;
    }
    sessionStorage.setItem(COOKIE_KEYS.TAB_ID, id);
  },

  /**
   * Generates a new unique tab ID
   */
  generateTabId(): string {
    return crypto.randomUUID();
  },

  /**
   * Gets the broadcast channel for multi-tab communication
   */
  getChannel(): InstanceType<typeof BroadcastChannel> | null {
    return channel;
  },

  /**
   * Sends a message through the broadcast channel
   */
  broadcast(message: { type: string; id: string }): void {
    channel?.postMessage(message);
  },

  /**
   * Creates a tab-scoped key by appending tab ID to base key
   */
  createTabScopedKey(baseKey: string): string {
    const tabId = this.getTabId();
    if (!tabId) {
      return baseKey;
    }
    return `${baseKey}-${tabId}`;
  },
};
