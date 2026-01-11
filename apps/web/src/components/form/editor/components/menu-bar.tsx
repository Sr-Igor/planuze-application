"use client";

import React from "react";

import { Separator, Toggle } from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { cn } from "@/lib/utils";

import { EDITOR_CLASSES } from "../constants/editor-settings";
import { useMenuOptions } from "../hooks/use-menu-options";
import type { MenuBarProps, MenuOption } from "../types";
import { ColorPicker } from "./color-picker";

export const MenuBar: React.FC<MenuBarProps> = ({ editor, className, onOpenModal }) => {
  const menuOptions = useMenuOptions(editor, onOpenModal);

  const renderToggleGroup = (options: MenuOption[], key: string) => (
    <div key={key} className="flex items-center space-x-1">
      {options.map((option, index) => (
        <AppTooltip text={option.title} key={index}>
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={(pressed) => {
              option.onClick();
            }}
            title={option.title}
            disabled={option.disabled}
            size="sm"
            className={cn(
              "text-foreground h-8 w-8 transition-all duration-200",
              option.pressed
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
            data-tiptap-menu-item
            role="button"
          >
            {option.icon}
          </Toggle>
        </AppTooltip>
      ))}
    </div>
  );

  return (
    <div className={cn(EDITOR_CLASSES.MENU_BAR.BASE, className)} data-tiptap-menu role="toolbar">
      {/* Histórico */}
      {renderToggleGroup(menuOptions.historyOptions, "history")}
      <Separator orientation="vertical" className="h-6" />

      {/* Títulos */}
      {renderToggleGroup(menuOptions.headingOptions, "headings")}
      <Separator orientation="vertical" className="h-6" />

      {/* Formatação de texto */}
      {renderToggleGroup(menuOptions.textFormattingOptions, "formatting")}
      <Separator orientation="vertical" className="h-6" />

      {/* Estilo */}
      <div className="flex items-center space-x-1">
        <AppTooltip text="Selecionar cor">
          <ColorPicker
            onColorSelect={(color) => editor.chain().focus().setColor(color).run()}
            currentColor={editor.getAttributes("textStyle").color}
          />
        </AppTooltip>
      </div>
      <Separator orientation="vertical" className="h-6" />

      {/* Alinhamento */}
      {renderToggleGroup(menuOptions.alignmentOptions, "alignment")}
      <Separator orientation="vertical" className="h-6" />

      {/* Listas */}
      {renderToggleGroup(menuOptions.listOptions, "lists")}
      <Separator orientation="vertical" className="h-6" />

      {/* Blocos */}
      {renderToggleGroup(menuOptions.blockOptions, "blocks")}
      <Separator orientation="vertical" className="h-6" />

      {/* Mídia */}
      {renderToggleGroup(menuOptions.mediaOptions, "media")}
      <Separator orientation="vertical" className="h-6" />

      {/* Tabela */}
      {renderToggleGroup(menuOptions.tableOptions, "table")}

      {/* Informações do editor */}
      {editor.storage.characterCount && (
        <div className="text-muted-foreground ml-auto text-xs">
          {editor.storage.characterCount.characters()} caracteres
        </div>
      )}
    </div>
  );
};
