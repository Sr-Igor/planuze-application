"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getFile } from "@repo/api";
import { useUserAuth } from "@repo/redux/hooks";

export interface UseImageProps {
  src: string;
  path: string;
  skipReq: boolean;
  publicFile: boolean;
}

export const useImage = ({ src, path, skipReq, publicFile }: UseImageProps) => {
  const URL_BASE = process.env.NEXT_PUBLIC_FILE_URL!;
  const [loading, setLoading] = useState(true);

  const { profile } = useUserAuth();

  const { data: blob, isError } = useQuery<Blob | null>({
    queryKey: ["file", src],
    queryFn: () =>
      getFile(`${URL_BASE}/${publicFile ? "public" : profile?.company_id}/${path}/${src}`),
    enabled: !skipReq && !!src,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      setLoading(false);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setBlobUrl(null);
      setLoading(false);
    }
  }, [blob]);

  return { data: skipReq ? src : blobUrl, isLoading: (loading || !blobUrl) && !isError, isError };
};
