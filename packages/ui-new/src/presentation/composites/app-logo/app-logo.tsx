"use client";

import { useTheme } from "next-themes";

import { cn } from "../../../shared/utils";

export interface AppLogoProps {
  /**
   * Width of the logo image
   */
  width: number;
  /**
   * Height of the logo image
   */
  height: number;
  /**
   * Additional class name
   */
  className?: string;
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
   * Custom Image component (e.g., Next.js Image)
   */
  ImageComponent?: React.ComponentType<{
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }>;
  /**
   * Custom Link component (e.g., Next.js Link)
   */
  LinkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
  }>;
}

const DefaultImage = ({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
  />
);

const DefaultLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => <a href={href}>{children}</a>;

export const AppLogo = ({
  width,
  height,
  className,
  logoLight = "/images/logo-dark.png",
  logoDark = "/images/logo-light.png",
  href = "/",
  alt = "Logo",
  ImageComponent = DefaultImage,
  LinkComponent = DefaultLink,
}: AppLogoProps) => {
  const { resolvedTheme } = useTheme();

  const effectiveTheme = resolvedTheme ?? "light";
  const logo = effectiveTheme === "dark" ? logoDark : logoLight;

  return (
    <LinkComponent href={href}>
      <ImageComponent
        alt={alt}
        src={logo}
        width={width}
        height={height}
        className={cn(className)}
      />
    </LinkComponent>
  );
};

AppLogo.displayName = "AppLogo";
