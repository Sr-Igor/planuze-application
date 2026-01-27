"use client";

import React, { Suspense, useMemo } from "react";

import dynamic from "next/dynamic";

import { DndContextProvider } from "../context";
import type { DndComponents } from "../types";
import { DndLoadingFallback } from "./loading-fallback";

const DragDropContext = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.DragDropContext),
  {
    ssr: false,
    loading: () => <DndLoadingFallback />,
  }
) as unknown as DndComponents["DragDropContext"];

const Droppable = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.Droppable), {
  ssr: false,
  loading: () => <DndLoadingFallback />,
}) as unknown as DndComponents["Droppable"];

const Draggable = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.Draggable), {
  ssr: false,
  loading: () => <DndLoadingFallback />,
}) as unknown as DndComponents["Draggable"];

export interface DndWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * DndWrapper - Wrapper component that ensures DND components are ready and provides them via context
 */
export const DndWrapper = ({ children, fallback }: DndWrapperProps) => {
  const components = useMemo(
    () => ({
      DragDropContext,
      Droppable,
      Draggable,
    }),
    []
  );

  return (
    <Suspense fallback={fallback ?? <DndLoadingFallback />}>
      <DndContextProvider components={components}>{children}</DndContextProvider>
    </Suspense>
  );
};

DndWrapper.displayName = "DndWrapper";
