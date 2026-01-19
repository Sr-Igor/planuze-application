"use client";

import { SidebarProvider } from "@repo/ui";

import { Nav } from "@/components/nav";

export const PublicTemplate = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="bg-background min-h-screen w-full">
        <Nav intermediate={false} />
        {children}
      </div>
    </SidebarProvider>
  );
};
