"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { cn } from "../../../shared/utils";

export interface AppClockProps extends Omit<ImageProps, "alt" | "src"> {
  /**
   * Light theme clock base image path
   */
  clockLightBase?: string;
  /**
   * Light theme clock pointer image path
   */
  clockLightPointer?: string;
  /**
   * Dark theme clock base image path
   */
  clockDarkBase?: string;
  /**
   * Dark theme clock pointer image path
   */
  clockDarkPointer?: string;
  /**
   * Link href (defaults to "/")
   */
  href?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
}

export const AppClock = ({
  clockLightBase = "/images/clock-dark.png",
  clockLightPointer = "/images/clock-dark-2.png",
  clockDarkBase = "/images/clock-1.png",
  clockDarkPointer = "/images/clock-2.png",
  href = "/",
  alt,
  className,
  ...rest
}: AppClockProps) => {
  const { resolvedTheme } = useTheme();

  const effectiveTheme = resolvedTheme ?? "light";
  const clockBase = effectiveTheme === "dark" ? clockDarkBase : clockLightBase;
  const clockPointer = effectiveTheme === "dark" ? clockDarkPointer : clockLightPointer;

  const imageAlt = alt ?? process.env.NEXT_PUBLIC_SYSTEM_NAME ?? "Clock";

  return (
    <div className="relative">
      <Link href={href}>
        <Image alt={imageAlt} src={clockBase} className={className} {...rest} />
        <Image
          alt={imageAlt}
          src={clockPointer}
          {...rest}
          className={cn(className, "absolute inset-0 animate-spin")}
          style={{ animationDuration: "60s" }}
        />
      </Link>
    </div>
  );
};

AppClock.displayName = "AppClock";
