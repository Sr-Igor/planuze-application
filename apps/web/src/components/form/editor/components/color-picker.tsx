"use client";

import React, { useEffect, useRef, useState } from "react";

import { useLang } from "@repo/language/hook";

import { cn } from "@/lib/utils";

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  currentColor?: string;
}

const getColors = (t: any) => [
  {
    name: t.editor("colors.foreground"),
    value: "hsl(var(--foreground))",
    class: "bg-foreground",
    isThemeColor: true,
  },
  {
    name: t.editor("colors.background"),
    value: "hsl(var(--background))",
    class: "bg-background border",
    isThemeColor: true,
  },
  { name: t.editor("colors.gray"), value: "#6b7280", class: "bg-gray-500", isThemeColor: false },
  { name: t.editor("colors.red"), value: "#ef4444", class: "bg-red-500", isThemeColor: false },
  {
    name: t.editor("colors.orange"),
    value: "#f97316",
    class: "bg-orange-500",
    isThemeColor: false,
  },
  {
    name: t.editor("colors.yellow"),
    value: "#eab308",
    class: "bg-yellow-500",
    isThemeColor: false,
  },
  { name: t.editor("colors.green"), value: "#22c55e", class: "bg-green-500", isThemeColor: false },
  { name: t.editor("colors.blue"), value: "#3b82f6", class: "bg-blue-500", isThemeColor: false },
  {
    name: t.editor("colors.purple"),
    value: "#a855f7",
    class: "bg-purple-500",
    isThemeColor: false,
  },
  { name: t.editor("colors.pink"), value: "#ec4899", class: "bg-pink-500", isThemeColor: false },
  { name: t.editor("colors.cyan"), value: "#06b6d4", class: "bg-cyan-500", isThemeColor: false },
  {
    name: t.editor("colors.indigo"),
    value: "#6366f1",
    class: "bg-indigo-500",
    isThemeColor: false,
  },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect, currentColor }) => {
  const t = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("left");
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const COLORS = getColors(t);

  const handleColorClick = (color: string) => {
    onColorSelect(color);
    setIsOpen(false);
  };

  const currentColorData = COLORS.find((color) => color.value === currentColor);
  const isCurrentColorTheme = currentColorData?.isThemeColor || false;

  useEffect(() => {
    if (isOpen && containerRef.current && popoverRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (containerRect.left + popoverRect.width > viewportWidth - 10) {
        setPosition("right");
      } else {
        setPosition("left");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "hover:bg-accent flex h-8 w-8 items-center justify-center rounded border transition-colors",
          isOpen && "bg-accent"
        )}
        title={t.editor("toolbar.select_color")}
      >
        <div
          className={cn("h-4 w-4 rounded border", isCurrentColorTheme && currentColorData?.class)}
          style={!isCurrentColorTheme ? { backgroundColor: currentColor || "#000000" } : undefined}
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "bg-muted border-border shadow-gray absolute top-full z-50 mt-1 grid max-w-[200px] min-w-[200px] grid-cols-3 gap-1 rounded-md border p-2 shadow-lg sm:grid-cols-4 md:grid-cols-6",
            position === "left" ? "left-0" : "right-0"
          )}
        >
          {COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleColorClick(color.value)}
              className={cn(
                "h-6 w-6 flex-shrink-0 rounded border transition-all hover:scale-110",
                color.class,
                currentColor === color.value && "ring-primary ring-2"
              )}
              style={!color.isThemeColor ? { backgroundColor: color.value } : undefined}
              title={color.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
