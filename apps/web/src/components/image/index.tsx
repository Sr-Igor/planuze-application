"use client";

import { memo, useCallback, useEffect, useState } from "react";

import Image, { ImageProps } from "next/image";

import { useQuery } from "@tanstack/react-query";

import { useLang } from "@repo/language/hook";
import { Skeleton } from "@repo/ui";

import { getFile } from "@repo/api/global/file";
import { useAuth } from "@repo/redux/hook";

export interface IImg extends ImageProps {
  callbackLink?: (url: string | null) => void;
  path: string;
  default?: string;
  file?: File;
  mimeType?: string;
  forceLoad?: boolean;
  fallback?: React.ReactNode;
  skipDefault?: boolean;
  publicFile?: boolean;
}

export const useImage = (src: string, path: string, skipReq: boolean, publicFile: boolean) => {
  const URL_BASE = process.env.NEXT_PUBLIC_FILE_URL!;
  const [loading, setLoading] = useState(true);

  const { profile } = useAuth();

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

export const Component = ({
  callbackLink,
  src,
  path,
  default: def = "/svg/image.svg",
  alt,
  style = { objectFit: "cover" },
  file,
  mimeType,
  forceLoad = true,
  fallback,
  skipDefault = false,
  publicFile = false,
  ...rest
}: IImg) => {
  const t = useLang();

  const skipReq =
    typeof src === "string" ? src?.startsWith("blob:") || src?.startsWith("http") || !src : true;

  const { data, isLoading, isError } = useImage(src as string, path, skipReq, publicFile);
  const [error, setError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  // Callback for parent component
  useEffect(() => {
    if (callbackLink) {
      const link = skipReq ? src : (data ?? null);
      callbackLink(typeof link === "string" ? link : null);
    }
  }, [data, src, skipReq, callbackLink]);

  // Determine file extension
  const getFileExtension = useCallback(() => {
    if (file?.name) {
      const parts = file.name.split(".");
      return parts.length > 1 ? parts.pop()?.toLowerCase() : undefined;
    } else if (mimeType) {
      return mimeType.split("/").pop()?.toLowerCase();
    } else if (typeof src === "string") {
      const parts = src.split(".");
      return parts.length > 1 ? parts.pop()?.toLowerCase() : undefined;
    }
    return undefined;
  }, [file?.name, mimeType, src]);

  // Determine image source
  const imageSrc = useCallback(() => {
    if (data && typeof data === "string") return data;
    if (fallback) return undefined; // Se tem fallback, não usa def
    if (skipDefault) return undefined;
    return def;
  }, [data, fallback, skipDefault, def]);

  // Calculate values after all hooks
  const ext = getFileExtension();
  const finalSrc = imageSrc();
  const imageTypes = ["png", "jpg", "jpeg", "gif", "webp", "svg"];

  // Loading state
  if (isLoading && !skipReq) {
    return <Skeleton className="h-full w-full" />;
  }

  // PDF viewer
  if (ext === "pdf") {
    const pdfSrc = data && typeof data === "string" ? data : def || "";
    return <embed src={pdfSrc} width="100%" height="100%" style={style} />;
  }

  // No preview for non-image files
  if ((!ext || !imageTypes.includes(ext)) && !forceLoad) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-gray-500 italic">
        <p className="max-w-full overflow-hidden text-center text-ellipsis whitespace-nowrap">
          {t.helper("file")} {ext?.toUpperCase() || "-"}.
        </p>
        <p>{t.helper("no_preview")}</p>
      </div>
    );
  }

  // Image component with error handling
  if (!error && !isError && finalSrc && typeof finalSrc === "string") {
    return (
      <Image
        {...rest}
        src={finalSrc}
        alt={alt || "image"}
        onError={() => setError(true)}
        style={style}
      />
    );
  }

  // Fallback has priority over default
  if (fallback) {
    return fallback;
  }

  // Default fallback
  return <></>;
};

export const Img = memo(Component, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.path === nextProps.path &&
    prevProps.publicFile === nextProps.publicFile &&
    prevProps.skipDefault === nextProps.skipDefault &&
    prevProps.forceLoad === nextProps.forceLoad &&
    prevProps.fallback === nextProps.fallback
  );
});
