"use client";

import Image from "next/image";

import { CreditCard } from "lucide-react";

import { cn } from "../../../shared/utils";

/* eslint-disable @typescript-eslint/no-require-imports */

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
}

export const CardFlag = ({ brand, width = 28, height = 18, className }: CardFlagProps) => {
  const normalized = brand?.toLowerCase()?.replace(/[^a-z]/g, "") || "";

  if (SUPPORTED_FLAGS.includes(normalized as SupportedCardBrand)) {
    try {
      const flag = require(`./svg/${normalized}.svg`);
      return (
        <div
          className={cn("flex items-center gap-2", className)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Image src={flag} alt={brand || ""} width={width} height={height} />
        </div>
      );
    } catch {
      return null;
    }
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <CreditCard
        className={cn(
          "h-5 w-5 text-gray-400",
          width && `w-[${width}px]`,
          height && `h-[${height}px]`
        )}
      />
    </div>
  );
};

CardFlag.displayName = "CardFlag";
