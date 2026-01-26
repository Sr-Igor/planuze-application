"use client";

import { cn, SidebarProvider } from "@repo/ui";

import { Header } from "./header";
import { AppSidebar } from "./sidebar";

export const PrivateTemplate = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full overflow-hidden">
        <Header />
        <div className={cn("relative mt-[68px] overflow-auto px-5", "h-[calc(100vh-68px)]")}>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
