"use client";

import React, { createContext, useContext } from "react";

import { FeatureWithActions } from "@repo/redux/hooks";

type ContextValue = {
  feature: FeatureWithActions | null | undefined;
};

const Context = createContext<ContextValue | null>(null);

export interface ProviderProps {
  children: React.ReactNode;
  value: ContextValue;
}

export function Provider({ children, value }: ProviderProps) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePrivateContext(): ContextValue {
  const context = useContext(Context);

  if (!context) {
    throw new Error("usePrivateContext deve ser usado dentro de um Provider");
  }

  return context as ContextValue;
}
