"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

export interface AppLogoProps extends Omit<ImageProps, "alt" | "src"> {
  /**
   * Light theme logo image path
   */
  logoLight?: string;
  /**
   * Dark theme logo image path
   */
  logoDark?: string;
  /**
   * Link href (defaults to "/")
   */
  href?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Whether to animate the logo
   */
  animated?: boolean;
}

export const AppLogo = ({
  logoLight = "/images/logo-dark.png",
  logoDark = "/images/logo-light.png",
  href = "/",
  alt,
  animated = true,
  ...rest
}: AppLogoProps) => {
  const { resolvedTheme } = useTheme();
  const [startOffset, setStartOffset] = useState(0);

  useEffect(() => {
    const now = new Date();
    const currentSeconds = now.getSeconds() + now.getMilliseconds() / 1000;
    setStartOffset(currentSeconds);
  }, []);

  const effectiveTheme = resolvedTheme ?? "light";
  const logo = effectiveTheme === "dark" ? logoDark : logoLight;

  const imageAlt = alt ?? process.env.NEXT_PUBLIC_SYSTEM_NAME ?? "Logo";

  return (
    <div className="relative">
      <Link href={href}>
        <Image alt={imageAlt} src={logo} {...rest} className="pointer-events-none z-2" />
      </Link>
      {animated && (
        <Image
          alt={imageAlt}
          src={"/images/clock-3.png"}
          {...rest}
          className={"absolute inset-0 animate-spin"}
          style={{
            animationDuration: "60s",
            animationDelay: `-${startOffset}s`,
            top: "10%",
            left: "-17.5%",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

AppLogo.displayName = "AppLogo";
