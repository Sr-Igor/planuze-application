"use client";

import { CreditCard } from "lucide-react";

import { cn } from "../../../shared/utils";

const SUPPORTED_FLAGS = [
  "visa",
  "mastercard",
  "elo",
  "amex",
  "diners",
  "discover",
  "hipercard",
  "jcb",
] as const;

export type SupportedCardBrand = (typeof SUPPORTED_FLAGS)[number];

export interface CardFlagProps {
  /**
   * Card brand name
   */
  brand?: string;
  /**
   * Width of the flag image
   */
  width?: number;
  /**
   * Height of the flag image
   */
  height?: number;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Custom Image component (e.g., Next.js Image)
   */
  ImageComponent?: React.ComponentType<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  /**
   * Function to get the flag image source
   * Receives the normalized brand name and should return the image source
   */
  getFlagSrc?: (brand: SupportedCardBrand) => string;
}

const DefaultImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => <img src={src} alt={alt} width={width} height={height} />;

export const CardFlag = ({
  brand,
  width = 28,
  height = 18,
  className,
  ImageComponent = DefaultImage,
  getFlagSrc,
}: CardFlagProps) => {
  const normalized = brand?.toLowerCase()?.replace(/[^a-z]/g, "") || "";

  if (SUPPORTED_FLAGS.includes(normalized as SupportedCardBrand) && getFlagSrc) {
    const flagSrc = getFlagSrc(normalized as SupportedCardBrand);

    return (
      <div
        className={cn("flex items-center gap-2", className)}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <ImageComponent
          src={flagSrc}
          alt={brand || ""}
          width={width}
          height={height}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <CreditCard
        className="text-gray-400"
        style={{ width, height }}
      />
    </div>
  );
};

CardFlag.displayName = "CardFlag";
