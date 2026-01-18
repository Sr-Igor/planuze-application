/**
 * AppImage Component Module
 *
 * Image component with support for protected files, blob URLs, and fallbacks.
 * This component is designed to work with Next.js Image component and supports
 * fetching protected images through a custom fetch function.
 *
 * @module presentation/composites/app-image
 */

"use client";

import { memo, ReactNode, useCallback, useEffect, useState } from "react";

import { Skeleton } from "../../primitives/skeleton";

// ============================================================================
// Types
// ============================================================================

export interface UseAppImageOptions {
  /**
   * Image source (filename or full URL)
   */
  src: string;
  /**
   * Path segment for building the URL (e.g., "profile/avatar")
   */
  path: string;
  /**
   * Whether to skip the fetch request (for blob/http URLs)
   */
  skipFetch: boolean;
  /**
   * Whether the file is public (doesn't require company_id)
   */
  publicFile: boolean;
  /**
   * Function to fetch the image blob
   */
  fetchImage?: (url: string) => Promise<Blob | null>;
  /**
   * Company ID for building protected URLs
   */
  companyId?: string;
  /**
   * Base URL for file storage
   */
  baseUrl?: string;
}

export interface UseAppImageResult {
  /**
   * Resolved image data (blob URL or original src)
   */
  data: string | null;
  /**
   * Whether the image is loading
   */
  isLoading: boolean;
  /**
   * Whether there was an error fetching the image
   */
  isError: boolean;
}

export interface AppImageProps {
  /**
   * Image source (filename, blob URL, or full URL)
   */
  src?: string;
  /**
   * Path segment for building the URL (e.g., "profile/avatar")
   */
  path: string;
  /**
   * Callback when the image URL is resolved
   */
  callbackLink?: (url: string | null) => void;
  /**
   * Default image source when the main source fails
   * @default "/svg/image.svg"
   */
  default?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Inline styles for the image
   */
  style?: React.CSSProperties;
  /**
   * File object for determining extension
   */
  file?: File;
  /**
   * MIME type of the file
   */
  mimeType?: string;
  /**
   * Whether to force load as image even if extension is unknown
   * @default true
   */
  forceLoad?: boolean;
  /**
   * Fallback component when image fails to load
   */
  fallback?: ReactNode;
  /**
   * Whether to skip the default image
   * @default false
   */
  skipDefault?: boolean;
  /**
   * Whether the file is public (doesn't require authentication)
   * @default false
   */
  publicFile?: boolean;
  /**
   * Whether to fill the container (similar to Next.js Image fill)
   */
  fill?: boolean;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Width of the image
   */
  width?: number | string;
  /**
   * Height of the image
   */
  height?: number | string;
  /**
   * Function to fetch the image blob (for protected images)
   */
  fetchImage?: (url: string) => Promise<Blob | null>;
  /**
   * Company ID for building protected URLs
   */
  companyId?: string;
  /**
   * Base URL for file storage
   */
  baseUrl?: string;
  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;
  /**
   * Custom no preview component
   */
  noPreviewComponent?: ReactNode;
  /**
   * Labels for the component
   */
  labels?: {
    file?: string;
    noPreview?: string;
  };
}

// ============================================================================
// Constants
// ============================================================================

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "svg"];

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook for loading images with support for protected files.
 *
 * @example
 * ```tsx
 * const { data, isLoading, isError } = useAppImage({
 *   src: "avatar.png",
 *   path: "profile/avatar",
 *   skipFetch: false,
 *   publicFile: false,
 *   fetchImage: myFetchFunction,
 *   companyId: "123",
 *   baseUrl: "https://files.example.com",
 * });
 * ```
 */
export function useAppImage({
  src,
  path,
  skipFetch,
  publicFile,
  fetchImage,
  companyId,
  baseUrl,
}: UseAppImageOptions): UseAppImageResult {
  const [loading, setLoading] = useState(true);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // If we should skip fetch, just return the src as-is
    if (skipFetch || !src) {
      setLoading(false);
      return;
    }

    // If no fetch function provided, we can't load protected images
    if (!fetchImage) {
      setLoading(false);
      setIsError(true);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setIsError(false);

    // Build the full URL
    const urlPath = publicFile ? "public" : companyId;
    const fullUrl = baseUrl ? `${baseUrl}/${urlPath}/${path}/${src}` : src;

    fetchImage(fullUrl)
      .then((blob) => {
        if (!isMounted) return;

        if (blob) {
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
        } else {
          setBlobUrl(null);
        }
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src, path, skipFetch, publicFile, fetchImage, companyId, baseUrl]);

  // Cleanup blob URL on unmount or when it changes
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return {
    data: skipFetch ? src : blobUrl,
    isLoading: (loading || (!blobUrl && !skipFetch)) && !isError,
    isError,
  };
}

// ============================================================================
// Component
// ============================================================================

const AppImageComponent = ({
  src,
  path,
  callbackLink,
  default: defaultSrc = "/svg/image.svg",
  alt,
  style = { objectFit: "cover" },
  file,
  mimeType,
  forceLoad = true,
  fallback,
  skipDefault = false,
  publicFile = false,
  fill,
  className,
  width,
  height,
  fetchImage,
  companyId,
  baseUrl,
  loadingComponent,
  noPreviewComponent,
  labels,
}: AppImageProps) => {
  // Determine if we should skip fetch (for blob URLs, http URLs, or empty src)
  const skipFetch =
    typeof src === "string"
      ? src?.startsWith("blob:") || src?.startsWith("http") || src?.startsWith("data:") || !src
      : true;

  const { data, isLoading, isError } = useAppImage({
    src: src as string,
    path,
    skipFetch,
    publicFile,
    fetchImage,
    companyId,
    baseUrl,
  });

  const [imageError, setImageError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  // Callback for parent component
  useEffect(() => {
    if (callbackLink) {
      const link = skipFetch ? src : (data ?? null);
      callbackLink(typeof link === "string" ? link : null);
    }
  }, [data, src, skipFetch, callbackLink]);

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
  const getImageSrc = useCallback(() => {
    if (data && typeof data === "string") return data;
    if (fallback) return undefined; // If there's a fallback, don't use default
    if (skipDefault) return undefined;
    return defaultSrc;
  }, [data, fallback, skipDefault, defaultSrc]);

  const ext = getFileExtension();
  const finalSrc = getImageSrc();

  const fileLabel = labels?.file ?? "File";
  const noPreviewLabel = labels?.noPreview ?? "No preview available";

  // Loading state
  if (isLoading && !skipFetch) {
    return <>{loadingComponent ?? <Skeleton className="h-full w-full" />}</>;
  }

  // PDF viewer
  if (ext === "pdf") {
    const pdfSrc = data && typeof data === "string" ? data : defaultSrc || "";
    return <embed src={pdfSrc} width="100%" height="100%" style={style} />;
  }

  // No preview for non-image files
  if ((!ext || !IMAGE_EXTENSIONS.includes(ext)) && !forceLoad) {
    if (noPreviewComponent) {
      return <>{noPreviewComponent}</>;
    }
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-gray-500 italic">
        <p className="max-w-full overflow-hidden text-center text-ellipsis whitespace-nowrap">
          {fileLabel} {ext?.toUpperCase() || "-"}.
        </p>
        <p>{noPreviewLabel}</p>
      </div>
    );
  }

  // Image component with error handling
  if (!imageError && !isError && finalSrc && typeof finalSrc === "string") {
    const imgStyle = fill
      ? {
          ...style,
          position: "absolute" as const,
          inset: 0,
          width: "100%",
          height: "100%",
        }
      : style;

    return (
      <img
        src={finalSrc}
        alt={alt || "image"}
        onError={() => setImageError(true)}
        style={imgStyle}
        className={className}
        width={width}
        height={height}
      />
    );
  }

  // Fallback has priority over default
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default fallback
  return null;
};

/**
 * AppImage component with memoization.
 *
 * @example
 * ```tsx
 * // Basic usage with public image
 * <AppImage
 *   src="avatar.png"
 *   path="profile/avatar"
 *   publicFile
 *   alt="User avatar"
 * />
 *
 * // With protected image
 * <AppImage
 *   src="document.png"
 *   path="documents"
 *   fetchImage={getFile}
 *   companyId={profile.company_id}
 *   baseUrl={process.env.NEXT_PUBLIC_FILE_URL}
 * />
 *
 * // With fallback
 * <AppImage
 *   src={user.avatar}
 *   path="profile/avatar"
 *   fallback={<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>}
 * />
 * ```
 */
export const AppImage = memo(AppImageComponent, (prevProps, nextProps) => {
  return (
    prevProps.src === nextProps.src &&
    prevProps.path === nextProps.path &&
    prevProps.publicFile === nextProps.publicFile &&
    prevProps.skipDefault === nextProps.skipDefault &&
    prevProps.forceLoad === nextProps.forceLoad &&
    prevProps.fallback === nextProps.fallback &&
    prevProps.className === nextProps.className
  );
});

AppImage.displayName = "AppImage";

// Legacy alias
export const Img = AppImage;
