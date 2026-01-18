/**
 * AppDropdownMenu Component Module
 *
 * A configurable dropdown menu component.
 *
 * @module presentation/composites/app-dropdown-menu
 */

"use client";

import { ReactNode } from "react";

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
} from "../../primitives/dropdown-menu";
import { Icon, IconName } from "../icon";

// ============================================================================
// Types
// ============================================================================

export type AppDropdownMenuSubItem = {
  label: string;
  onClick: () => void;
  shortcut?: string;
  icon?: IconName;
  separator?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
};

export type AppDropdownMenuItem = {
  label?: string;
  onClick?: () => void;
  shortcut?: string;
  icon?: IconName;
  variant?: "destructive";
  separator?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
  subItems?: AppDropdownMenuSubItem[];
};

export type AppDropdownMenuGroup = {
  title?: string;
  items: AppDropdownMenuItem[];
};

export type AppDropdownMenuProps = {
  /**
   * Menu title.
   */
  title?: string;
  /**
   * Trigger element.
   */
  trigger: ReactNode;
  /**
   * Menu groups.
   */
  groups: AppDropdownMenuGroup[];
  /**
   * Additional class name for the trigger.
   */
  className?: string;
};

// ============================================================================
// Helpers
// ============================================================================

function isItemVisible(item: AppDropdownMenuItem): boolean {
  if (item.separator) return false;
  if (item.isVisible === false) return false;
  if (item.subItems && item.subItems.length > 0) {
    return item.subItems.some((subItem) => subItem.isVisible !== false);
  }
  return true;
}

function hasVisibleItems(group: AppDropdownMenuGroup): boolean {
  return group.items.some((item) => isItemVisible(item));
}

// ============================================================================
// Component
// ============================================================================

/**
 * AppDropdownMenu component.
 *
 * A configurable dropdown menu with support for groups, sub-menus, and icons.
 *
 * @example
 * ```tsx
 * <AppDropdownMenu
 *   trigger={<Button>Open Menu</Button>}
 *   groups={[
 *     {
 *       title: "Actions",
 *       items: [
 *         { label: "Edit", icon: "Pencil", onClick: handleEdit },
 *         { label: "Delete", icon: "Trash", variant: "destructive", onClick: handleDelete },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
function AppDropdownMenu({ title, trigger, groups, className }: AppDropdownMenuProps) {
  const hasAnyVisibleItems = groups.some((group) => hasVisibleItems(group));

  if (!hasAnyVisibleItems) return null;

  const renderMenuItem = (item: AppDropdownMenuItem, index: number) => {
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

  const renderGroup = (group: AppDropdownMenuGroup, groupIndex: number) => {
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
}

export { AppDropdownMenu };
