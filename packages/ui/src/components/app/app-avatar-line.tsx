import { Skeleton } from "@repo/ui";

import { AppAvatar } from "./app-avatar";

export interface IAppAvatarLineProps {
  loading: boolean;
  name?: string | null;
  avatar?: string | null;
  internal?: boolean;
}

export const AppAvatarLine = ({ loading, name, avatar, internal }: IAppAvatarLineProps) => {
  return (
    <>
      {loading && (
        <span className="flex items-center gap-2">
          <span className="relative h-7 w-7 overflow-hidden rounded-full">
            <Skeleton className="h-full w-full" />
          </span>
          <Skeleton className="h-4 w-24" />
        </span>
      )}
      {!loading && (
        <span className="flex items-center gap-2">
          <AppAvatar
            src={avatar || ""}
            path={internal ? "profile/anonymous_avatar" : "user/avatar"}
            name={name || ""}
            className="h-7 w-7"
            publicFile={!internal}
          />
          <p>{name}</p>
        </span>
      )}
    </>
  );
};
