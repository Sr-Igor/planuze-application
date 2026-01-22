"use client";

import { useCallback } from "react";

import { getFile } from "@repo/api";
import { useAuth } from "@repo/redux/hook";

type ImagePath =
  | "user/avatar"
  | "company/logo"
  | "client/avatar"
  | "project/logo"
  | "integration/logo"
  | (string & {});

/**
 * Hook that creates a fetchImage function for the storage system
 *
 * @example
 * ```tsx
 * const fetchImage = useFetchImage("user/avatar", true);
 *
 * <AppAvatar
 *   src={user.avatar}
 *   name={user.name}
 *   fetchImage={fetchImage}
 * />
 * ```
 */
export function useFetchImage(path: ImagePath, publicFile: boolean = false) {
  const { profile } = useAuth();
  const URL_BASE = process.env.NEXT_PUBLIC_FILE_URL!;

  const fetchImage = useCallback(
    async (src: string): Promise<Blob | null> => {
      if (!src) return null;

      const fullUrl = `${URL_BASE}/${publicFile ? "public" : profile?.company_id}/${path}/${src}`;
      return getFile(fullUrl);
    },
    [URL_BASE, path, publicFile, profile?.company_id]
  );

  return fetchImage;
}
