"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps, StaticImageData } from "next/image";
import Link from "next/link";

import { LogoDark, LogoLight } from "@repo/assets";

export interface AppLogoProps extends Omit<ImageProps, "alt" | "src"> {
  /**
   * Light theme logo image path
   */
  logoLight?: string | StaticImageData;
  /**
   * Dark theme logo image path
   */
  logoDark?: string | StaticImageData;
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
  logoLight = LogoLight,
  logoDark = LogoDark,
  href = "/",
  alt,
  animated = true,
  ...rest
}: AppLogoProps) => {
  const { resolvedTheme } = useTheme();

  const effectiveTheme = resolvedTheme ?? "light";
  const logo = effectiveTheme === "light" ? logoDark : logoLight;

  const imageAlt = alt ?? process.env.NEXT_PUBLIC_SYSTEM_NAME ?? "Logo";

  return (
    <div className="relative">
      <Link href={href}>
        <Image alt={imageAlt} src={logo} {...rest} className="pointer-events-none" />
      </Link>
    </div>
  );
};

AppLogo.displayName = "AppLogo";
