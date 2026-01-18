"use client";

import { useTheme } from "next-themes";

import { cn } from "../../../shared/utils";

export interface AppClockProps {
  /**
   * Width of the clock image
   */
  width: number;
  /**
   * Height of the clock image
   */
  height: number;
  /**
   * Additional class name
   */
  className?: string;
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
  /**
   * Custom Image component (e.g., Next.js Image)
   */
  ImageComponent?: React.ComponentType<{
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    style?: React.CSSProperties;
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
  style,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    style={style}
  />
);

const DefaultLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => <a href={href}>{children}</a>;

export const AppClock = ({
  width,
  height,
  className,
  clockLightBase = "/images/clock-dark.png",
  clockLightPointer = "/images/clock-dark-2.png",
  clockDarkBase = "/images/clock-1.png",
  clockDarkPointer = "/images/clock-2.png",
  href = "/",
  alt = "Clock",
  ImageComponent = DefaultImage,
  LinkComponent = DefaultLink,
}: AppClockProps) => {
  const { resolvedTheme } = useTheme();

  const effectiveTheme = resolvedTheme ?? "light";
  const clockBase = effectiveTheme === "dark" ? clockDarkBase : clockLightBase;
  const clockPointer = effectiveTheme === "dark" ? clockDarkPointer : clockLightPointer;

  return (
    <div className={cn("relative", className)}>
      <LinkComponent href={href}>
        <ImageComponent
          alt={alt}
          src={clockBase}
          width={width}
          height={height}
        />
        <ImageComponent
          alt={alt}
          src={clockPointer}
          width={width}
          height={height}
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "60s" }}
        />
      </LinkComponent>
    </div>
  );
};

AppClock.displayName = "AppClock";
