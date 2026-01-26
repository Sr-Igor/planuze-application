"use client";

import { memo, useCallback, useEffect, useState } from "react";

import Image, { ImageProps } from "next/image";

import { ImageIcon } from "@repo/assets";
import { useLang } from "@repo/language/hooks";

import { Skeleton } from "../../primitives/skeleton";
import { useImage } from "./use-image";

export interface AppImageProps extends ImageProps {
  callbackLink?: (url: string | null) => void;
  path: string;
  default?: any;
  file?: File;
  mimeType?: string;
  forceLoad?: boolean;
  fallback?: React.ReactNode;
  skipDefault?: boolean;
  publicFile?: boolean;
}

export const Component = ({
  callbackLink,
  src,
  path,
  default: def = ImageIcon,
  alt,
  style = { objectFit: "cover" },
  file,
  mimeType,
  forceLoad = true,
  fallback,
  skipDefault = false,
  publicFile = false,
  ...rest
}: AppImageProps) => {
  const { helper } = useLang();

  const skipReq =
    typeof src === "string" ? src?.startsWith("blob:") || src?.startsWith("http") || !src : true;
  const { data, isLoading, isError } = useImage({
    src: src as string,
    path,
    skipReq,
    publicFile,
  });
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
          {helper("file")} {ext?.toUpperCase() || "-"}.
        </p>
        <p>{helper("no_preview")}</p>
      </div>
    );
  }

  // Image component with error handling
  if (!error && !isError && finalSrc) {
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

export const AppImage = memo(Component, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.path === nextProps.path &&
    prevProps.publicFile === nextProps.publicFile &&
    prevProps.skipDefault === nextProps.skipDefault &&
    prevProps.forceLoad === nextProps.forceLoad &&
    prevProps.fallback === nextProps.fallback
  );
});
