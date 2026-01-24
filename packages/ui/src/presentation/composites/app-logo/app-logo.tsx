"use client";

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

  const effectiveTheme = resolvedTheme ?? "light";
  const logo = effectiveTheme === "dark" ? logoDark : logoLight;

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
