/**
 * AppTheme Component Module
 *
 * Theme toggle component for switching between light, dark, and system themes.
 *
 * @module presentation/composites/app-theme
 */

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../primitives/dropdown-menu";

export type AppThemeProps = {
  /**
   * Labels for the theme options.
   */
  labels?: {
    light?: string;
    dark?: string;
    system?: string;
    srOnly?: string;
  };
};

/**
 * AppTheme component.
 *
 * A dropdown menu for toggling between light, dark, and system themes.
 *
 * @example
 * ```tsx
 * <AppTheme />
 * <AppTheme labels={{ light: "Claro", dark: "Escuro", system: "Sistema" }} />
 * ```
 */
function AppTheme({ labels }: AppThemeProps) {
  const { setTheme } = useTheme();

  const lightLabel = labels?.light ?? "Light";
  const darkLabel = labels?.dark ?? "Dark";
  const systemLabel = labels?.system ?? "System";
  const srOnlyLabel = labels?.srOnly ?? "Toggle theme";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{srOnlyLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>{lightLabel}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>{darkLabel}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>{systemLabel}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AppTheme };
