"use client";

import { Skeleton } from "../../primitives/skeleton";
import { AppAvatar, type AppAvatarProps } from "../app-avatar";

export interface AppAvatarLineProps extends Omit<AppAvatarProps, "name" | "loading" | "path"> {
  /**
   * Whether the component is in loading state
   */
  loading: boolean;
  /**
   * Name to display
   */
  name?: string | null;
  /**
   * Avatar image source
   */
  avatar?: string | null;
  /**
   * Path segment for building the URL (e.g., "profile/avatar")
   * @default "profile/avatar"
   */
  path?: string;
  /**
   * Whether the user is internal/anonymous
   */
  internal?: boolean;
}

export const AppAvatarLine = ({
  loading,
  name,
  avatar,
  path = "profile/avatar",
  internal,
  ...rest
}: AppAvatarLineProps) => {
  if (loading) {
    return (
      <span className="flex items-center gap-2">
        <span className="relative h-7 w-7 overflow-hidden rounded-full">
          <Skeleton className="h-full w-full" />
        </span>
        <Skeleton className="h-4 w-24" />
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <AppAvatar {...rest} path={path} src={avatar || ""} name={name || ""} className="h-7 w-7" />
      <p>{name}</p>
    </span>
  );
};

AppAvatarLine.displayName = "AppAvatarLine";
