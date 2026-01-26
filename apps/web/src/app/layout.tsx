import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { geistMono, geistSans } from "@repo/fonts";
import { Progress, QueryProvider } from "@repo/providers";
import { Provider as Redux } from "@repo/redux/provider";
import { Toaster } from "@repo/ui";

import "@/app/globals.css";
import { NotificationManager } from "@/hooks/notification";
import { Provider as Socket } from "@/providers/socket";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SYSTEM_NAME,
  description: process.env.NEXT_PUBLIC_SYSTEM_DESCRIPTION,
};

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) => {
  const { locale } = params ? await params : { locale: undefined };

  return (
    <html suppressHydrationWarning lang={locale || "en-US"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}
      >
        <ThemeProvider attribute="class">
          <Progress />
          <div className="fixed top-0 right-10 z-50"></div>
          <Redux>
            <QueryProvider>
              {children}
              <Socket />
              <Toaster />
              <NotificationManager />
            </QueryProvider>
          </Redux>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
