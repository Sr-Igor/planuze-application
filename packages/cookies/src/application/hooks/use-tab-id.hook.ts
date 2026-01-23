"use client";

import { useEffect, useState } from "react";

import { tabIdService } from "../../infrastructure/services/tab-id.service";

const PING_TIMEOUT_MS = 100;

/**
 * React hook that manages tab ID with BroadcastChannel for multi-tab support
 * Detects if multiple tabs are open and generates unique IDs for each
 * 
 * @returns The current tab ID or null if not yet initialized
 */
export function useTabId(): string | null {
  const [tabId, setTabId] = useState(() => tabIdService.getTabId());

  useEffect(() => {
    const currentTabId = tabIdService.getTabId();
    const channel = tabIdService.getChannel();

    const handleMessage = (event: MessageEvent) => {
      const { type, id } = event.data;
      const myCurrentId = tabIdService.getTabId();

      if (type === "PING" && id === myCurrentId) {
        tabIdService.broadcast({ type: "PONG", id: myCurrentId! });
      }
    };

    channel?.addEventListener("message", handleMessage);

    if (currentTabId) {
      // Check if another tab already has this ID
      let pongReceived = false;

      const pongListener = (event: MessageEvent) => {
        const { type, id } = event.data;
        if (type === "PONG" && id === currentTabId) {
          pongReceived = true;
        }
      };

      channel?.addEventListener("message", pongListener);
      tabIdService.broadcast({ type: "PING", id: currentTabId });

      setTimeout(() => {
        channel?.removeEventListener("message", pongListener);

        if (pongReceived) {
          // Another tab has this ID, generate a new one
          const newId = tabIdService.generateTabId();
          tabIdService.setTabId(newId);
          setTabId(newId);
        } else {
          setTabId(currentTabId);
        }
      }, PING_TIMEOUT_MS);
    } else {
      // No tab ID, generate a new one
      const newId = tabIdService.generateTabId();
      tabIdService.setTabId(newId);
      setTabId(newId);
    }

    return () => {
      channel?.removeEventListener("message", handleMessage);
    };
  }, []);

  return tabId;
}

// Re-export getTabId for non-React usage
export { tabIdService };
