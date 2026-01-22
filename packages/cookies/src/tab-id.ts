"use client";

import { useEffect, useState } from "react";

const TAB_ID_KEY = process.env.NEXT_PUBLIC_TAB_ID_KEY || "app_tab_id";
const CHANNEL_NAME = "tab_id_broadcast_channel";

let channel: BroadcastChannel | null = null;
if (globalThis.window) {
  channel = new BroadcastChannel(CHANNEL_NAME);
}

/**
 * Gets the current tab ID from sessionStorage
 * This is used to isolate cookies per browser tab
 */
export function getTabId(): string | null {
  if (!globalThis.window) return null;
  return sessionStorage.getItem(TAB_ID_KEY);
}

/**
 * React hook that manages tab ID with BroadcastChannel for multi-tab support
 * Detects if multiple tabs are open and generates unique IDs for each
 */
export function useTabId() {
  const [tabId, setTabId] = useState(() => getTabId());

  useEffect(() => {
    const currentTabId = sessionStorage.getItem(TAB_ID_KEY);
    const PING_TIMEOUT_MS = 100;

    const handleMessage = (event: MessageEvent) => {
      const { type, id } = event.data;

      const myCurrentId = sessionStorage.getItem(TAB_ID_KEY);
      if (type === "PING" && id === myCurrentId) {
        channel?.postMessage({ type: "PONG", id: myCurrentId });
      }
    };

    channel?.addEventListener("message", handleMessage);

    if (currentTabId) {
      let pongReceived = false;

      const pongListener = (event: MessageEvent) => {
        const { type, id } = event.data;
        if (type === "PONG" && id === currentTabId) {
          pongReceived = true;
        }
      };

      channel?.addEventListener("message", pongListener);

      channel?.postMessage({ type: "PING", id: currentTabId });

      setTimeout(() => {
        channel?.removeEventListener("message", pongListener);

        if (pongReceived) {
          const newId = crypto.randomUUID();
          sessionStorage.setItem(TAB_ID_KEY, newId);
          setTabId(newId);
        } else {
          setTabId(currentTabId);
        }
      }, PING_TIMEOUT_MS);
    } else {
      const newId = crypto.randomUUID();
      sessionStorage.setItem(TAB_ID_KEY, newId);
      setTabId(newId);
    }

    return () => {
      channel?.removeEventListener("message", handleMessage);
    };
  }, []);

  return tabId;
}
