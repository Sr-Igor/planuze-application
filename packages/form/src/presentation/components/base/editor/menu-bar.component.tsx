'use client';

import React from 'react';

import { Separator, Toggle, cn } from '@repo/ui';
import { AppTooltip } from '@repo/ui';

import { EDITOR_CLASSES } from '../../../../shared/constants/editor-settings.constant';
import { useMenuOptions } from '../../../hooks/editor/use-menu-options.hook';
import type { MenuBarProps, MenuOption } from '../../../../shared/types/editor.types';
import { ColorPicker } from './color-picker.component';
import { useLang } from '@repo/language/hooks';

export const MenuBar: React.FC<MenuBarProps> = ({ editor, className, onOpenModal }) => {
    const menuOptions = useMenuOptions(editor, onOpenModal);
    const t = useLang();

    const renderToggleGroup = (options: MenuOption[], key: string) => (
        <div key={key} className="flex items-center space-x-1">
            {options.map((option, index) => (
                <AppTooltip text={option.title} key={`${key}-${index}`}>
                    <Toggle
                        key={`${key}-${index}`}
                        pressed={option.pressed}
                        onPressedChange={(pressed) => {
                            option.onClick();
                        }}
                        title={option.title}
                        disabled={option.disabled}
                        size="sm"
                        className={cn(
                            'text-foreground h-8 w-8 transition-all duration-200',
                            option.pressed
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'hover:bg-accent hover:text-accent-foreground'
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
            {/* History */}
            {renderToggleGroup(menuOptions.historyOptions, 'history')}
            <Separator orientation="vertical" className="h-6" />

            {/* Headings */}
            {renderToggleGroup(menuOptions.headingOptions, 'headings')}
            <Separator orientation="vertical" className="h-6" />

            {/* Text formatting */}
            {renderToggleGroup(menuOptions.textFormattingOptions, 'formatting')}
            <Separator orientation="vertical" className="h-6" />

            {/* Style */}
            <div className="flex items-center space-x-1">
                <AppTooltip text={t.editor('toolbar.select_color')}>
                    <ColorPicker
                        onColorSelect={(color) => editor.chain().focus().setColor(color).run()}
                        currentColor={editor.getAttributes('textStyle').color}
                    />
                </AppTooltip>
            </div>
            <Separator orientation="vertical" className="h-6" />

            {/* Alignment */}
            {renderToggleGroup(menuOptions.alignmentOptions, 'alignment')}
            <Separator orientation="vertical" className="h-6" />

            {/* Lists */}
            {renderToggleGroup(menuOptions.listOptions, 'lists')}
            <Separator orientation="vertical" className="h-6" />

            {/* Blocks */}
            {renderToggleGroup(menuOptions.blockOptions, 'blocks')}
            <Separator orientation="vertical" className="h-6" />

            {/* Media */}
            {renderToggleGroup(menuOptions.mediaOptions, 'media')}
            <Separator orientation="vertical" className="h-6" />

            {/* Table */}
            {renderToggleGroup(menuOptions.tableOptions, 'table')}

            {/* Editor info */}
            {editor.storage.characterCount && (
                <div className="text-muted-foreground ml-auto text-xs">
                    {editor.storage.characterCount.characters()} caracteres
                </div>
            )}
        </div>
    );
};
