"use client";

import * as React from "react";

import { icons } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/ui";

import { Icon } from "./icon";

export interface IAppDropdownMenuSubItem {
  label: string;
  onClick: () => void;
  shortcut?: string;
  icon?: keyof typeof icons;
  separator?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
}

export interface IAppDropdownMenuItem {
  label?: string;
  onClick?: () => void;
  shortcut?: string;
  icon?: keyof typeof icons;
  variant?: "destructive";
  separator?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
  subItems?: IAppDropdownMenuSubItem[];
}

export interface IAppDropdownMenuGroup {
  title?: string;
  items: IAppDropdownMenuItem[];
}

export interface IAppDropdownMenuProps {
  title?: string;
  trigger: React.ReactNode;
  groups: IAppDropdownMenuGroup[];
  className?: string;
}

export const AppDropdownMenu = ({ title, trigger, groups, className }: IAppDropdownMenuProps) => {
  const isItemVisible = (item: IAppDropdownMenuItem): boolean => {
    if (item.separator) return false;

    if (item.isVisible === false) return false;

    if (item.subItems && item.subItems.length > 0) {
      return item.subItems.some((subItem) => subItem.isVisible !== false);
    }

    return true;
  };

  const hasVisibleItems = (group: IAppDropdownMenuGroup): boolean => {
    return group.items.some((item) => isItemVisible(item));
  };

  const hasAnyVisibleItems = groups.some((group) => hasVisibleItems(group));

  if (!hasAnyVisibleItems) return null;

  const renderMenuItem = (item: IAppDropdownMenuItem, index: number) => {
    if (item.isVisible === false) return null;

    if (item.separator) {
      return <DropdownMenuSeparator key={`separator-${index}`} className="my-0" />;
    }

    if (item.subItems && item.subItems.length > 0) {
      return (
        <DropdownMenuSub key={`sub-${index}`}>
          <DropdownMenuSubTrigger disabled={item.disabled}>
            {item.icon && <Icon name={item.icon} />}
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {item.subItems
                .filter((subItem) => subItem.isVisible !== false)
                .map((subItem, subIndex) => (
                  <DropdownMenuItem
                    key={`sub-item-${subIndex}`}
                    onClick={subItem.onClick}
                    disabled={subItem.disabled}
                  >
                    {subItem.icon && <Icon name={subItem.icon} />}
                    {subItem.label}
                    {subItem.shortcut && (
                      <DropdownMenuShortcut>{subItem.shortcut}</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem
        key={`item-${index}`}
        onClick={item.onClick}
        disabled={item.disabled}
        variant={item.variant}
      >
        {item.icon && <Icon name={item.icon} />}
        {item.label}
        {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
      </DropdownMenuItem>
    );
  };

  const renderGroup = (group: IAppDropdownMenuGroup, groupIndex: number) => {
    return (
      <DropdownMenuGroup key={`group-${groupIndex}`}>
        {group.title && (
          <DropdownMenuLabel className="text-foreground/50 text-xs font-bold">
            {group.title}
          </DropdownMenuLabel>
        )}
        {group.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
      </DropdownMenuGroup>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {title && <DropdownMenuLabel>{title}</DropdownMenuLabel>}
        {groups.map((group, index) => renderGroup(group, index))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
