"use client";

import React, { createContext, useContext } from "react";

import type { DndComponents } from "../types";

interface DndContextValue {
  components: DndComponents | null;
  isReady: boolean;
}

const DndContext = createContext<DndContextValue>({
  components: null,
  isReady: false,
});

export interface DndContextProviderProps {
  /**
   * DnD components to use
   */
  components: DndComponents;
  /**
   * Children to render
   */
  children: React.ReactNode;
}

/**
 * Provider for DnD components
 * This allows the library to be framework-agnostic by injecting the DnD components
 */
export const DndContextProvider = ({ components, children }: DndContextProviderProps) => {
  return (
    <DndContext.Provider value={{ components, isReady: true }}>
      {children}
    </DndContext.Provider>
  );
};

/**
 * Hook to access DnD components
 */
export const useDndComponents = () => {
  const context = useContext(DndContext);

  if (!context.isReady || !context.components) {
    throw new Error("useDndComponents must be used within a DndContextProvider");
  }

  return context.components;
};

/**
 * Hook to check if DnD is ready
 */
export const useDndReady = () => {
  const context = useContext(DndContext);
  return context.isReady;
};
