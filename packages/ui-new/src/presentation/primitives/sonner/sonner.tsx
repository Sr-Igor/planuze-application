/**
 * Sonner (Toast) Component Module
 *
 * Toast notifications using Sonner library.
 *
 * @module presentation/primitives/sonner
 */

"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

export type { ToasterProps };

/**
 * Toaster component.
 *
 * Displays toast notifications.
 *
 * @example
 * ```tsx
 * // In your root layout
 * <Toaster />
 *
 * // To trigger a toast
 * import { toast } from 'sonner'
 * toast.success('Success!')
 * ```
 */
function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
      }}
      position="top-center"
      {...props}
    />
  );
}

export { Toaster };
