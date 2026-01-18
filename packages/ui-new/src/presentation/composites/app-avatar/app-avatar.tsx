"use client";

import { Avatar, AvatarFallback } from "../../primitives/avatar";
import { AppImage, type AppImageProps } from "../app-image";

import { cn } from "../../../shared/utils";

export interface AppAvatarProps extends Omit<AppImageProps, "alt" | "fill"> {
  /**
   * Name to display as fallback initials
   */
  name: string;
  /**
   * Additional class name for the fallback
   */
  fallbackClassName?: string;
}

export const AppAvatar = ({
  name,
  className,
  fallbackClassName,
  ...rest
}: AppAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full",
        className
      )}
    >
      <AppImage
        {...rest}
        fill
        alt={name}
        fallback={
          <AvatarFallback className={cn("text-sm", fallbackClassName)}>
            {name?.charAt(0)}
          </AvatarFallback>
        }
      />
    </Avatar>
  );
};

AppAvatar.displayName = "AppAvatar";
