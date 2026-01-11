"use client";

import { memo, useState } from "react";

import { Plus } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { Permission } from "@/components/ui/permission";

import { UploadModal } from "./UploadModal";

interface AddFileButtonProps {
  onDrop: (files: File[]) => void;
  disabled?: boolean;
  maxFileSize?: number;
  allowedTypes?: string[];
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const AddFileButton = memo(
  ({
    onDrop,
    disabled = false,
    maxFileSize,
    allowedTypes,
    variant = "default",
    size = "default",
    className,
  }: AddFileButtonProps) => {
    const t = useLang();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      if (!disabled) {
        setIsModalOpen(true);
      }
    };

    return (
      <>
        {!disabled && (
          <Button
            onClick={handleOpenModal}
            disabled={disabled}
            variant={variant}
            size={size}
            className={className}
          >
            <Plus className="h-4 w-4" />
            <span className="ml-2 hidden md:block">{t.helper("add_files")}</span>
          </Button>
        )}

        <UploadModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onDrop={onDrop}
          disabled={disabled}
          maxFileSize={maxFileSize}
          allowedTypes={allowedTypes}
        />
      </>
    );
  }
);

AddFileButton.displayName = "AddFileButton";
