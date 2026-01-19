"use client";

import React, { Suspense } from "react";

import { DndLoadingFallback } from "./loading-fallback";

export interface DndWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * DndWrapper - Wrapper component that ensures DND components are ready
 */
export const DndWrapper = ({ children, fallback }: DndWrapperProps) => {
  return (
    <Suspense fallback={fallback ?? <DndLoadingFallback />}>
      {children}
    </Suspense>
  );
};

DndWrapper.displayName = "DndWrapper";
