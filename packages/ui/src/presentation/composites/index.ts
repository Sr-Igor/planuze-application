/**
 * Composites Module
 *
 * Composite components are higher-level components built on top of primitives.
 * They provide common patterns and pre-configured combinations of primitives.
 *
 * @module presentation/composites
 */

// AppCard
export { AppCard } from "./app-card";
export type { AppCardProps } from "./app-card";

// AppDialog
export { AppDialog } from "./app-dialog";
export type { AppDialogProps } from "./app-dialog";

// AppDropdownMenu
export { AppDropdownMenu } from "./app-dropdown-menu";
export type {
  AppDropdownMenuGroup,
  AppDropdownMenuItem,
  AppDropdownMenuProps,
  AppDropdownMenuSubItem,
} from "./app-dropdown-menu";

// AppTheme
export { AppTheme } from "./app-theme";
export type { AppThemeProps } from "./app-theme";

// AppTooltip
export { AppTooltip } from "./app-tooltip";
export type { AppTooltipProps } from "./app-tooltip";

// DynamicScrollArea
export { DynamicScrollArea } from "./dynamic-scroll";
export type { DynamicScrollAreaProps } from "./dynamic-scroll";

// FullScreenMessage
export { FullScreenMessage } from "./full-screen-message";
export type { FullScreenMessageProps } from "./full-screen-message";

// Icon
export { Icon } from "./icon";
export type { IconName, IconProps } from "./icon";

// InfoModalLayout
export { InfoModalLayout } from "./info-modal";
export type { InfoModalLayoutProps } from "./info-modal";

// MainCard
export { MainCard } from "./main-card";
export type { MainCardProps } from "./main-card";

// StatusCircle
export { StatusCircle } from "./status-circle";
export type { StatusCircleProps } from "./status-circle";

// AppTable
export { AppTable, TableProvider, useTableContext } from "./app-table";
export {
  AppTableActions,
  AppTableCell,
  AppTableColgroup,
  AppTableEmptyState,
  AppTableHeader,
  AppTableLoadingSkeleton,
  AppTablePagination,
  AppTableRow,
  TableTooltip,
} from "./app-table";
export {
  useTableFilters,
  useTableSelection,
  useTableSorting,
  useTableState,
  useWindowWidth,
} from "./app-table";
export type {
  BaseTableItem,
  TableAction,
  TableColumn,
  TableColumnAccessor,
  TableContextValue,
  TableEventHandlers,
  TableFilters,
  TableLabels,
  TablePagination,
  TableProps as AppTableComponentProps,
  TableSorting,
  TableState,
  TableTooltipProps,
} from "./app-table";

// AppImage
export { AppImage } from "./app-image";
export type { AppImageProps } from "./app-image";

// AppAvatar
export { AppAvatar } from "./app-avatar";
export type { AppAvatarProps } from "./app-avatar";

// AppAvatarLine
export { AppAvatarLine } from "./app-avatar-line";
export type { AppAvatarLineProps } from "./app-avatar-line";

// AppClock
export { AppClock } from "./app-clock";
export type { AppClockProps } from "./app-clock";

// AppLogo
export { AppLogo } from "./app-logo";
export type { AppLogoProps } from "./app-logo";

// AppCountdown
export { AppCountdown } from "./app-countdown";
export type { AppCountdownProps } from "./app-countdown";

// AppCardSelector
export { AppCardSelector } from "./app-card-selector";
export type { AppCardSelectorProps, CardSelectorItem } from "./app-card-selector";

// CardFlag
export { CardFlag } from "./card-flag";
export type { CardFlagProps } from "./card-flag";

// AppTrash
export { AppTrash, AppTrash as Trash } from "./app-trash";
export type { AppTrashProps, AppTrashProps as TrashProps, TrashLabels } from "./app-trash";

// AppLogs
export { AppLogs, AppLogs as Logs, AppLogsModal } from "./app-logs";
export type {
  AppLogsModalProps,
  DiffItem,
  FormattedValue,
  LogAction,
  LogEntry,
  LogEntryIntegration,
  LogEntryUser,
  LogsComparisonProps,
  LogsComparisonProps as ILogsComparison,
  LogsLabels,
} from "./app-logs";

// AppDnd
export {
  DndContextProvider,
  DndLoadingFallback,
  DndProvider,
  DndProvider as ProviderDND,
  DndWrapper,
  DraggableItem,
  useDndComponents,
  useDndReady,
  useDndStyles,
} from "./app-dnd";
export type {
  DndComponents,
  DndContextProviderProps,
  DndDraggableProvided,
  DndDraggableSnapshot,
  DndDroppableProvided,
  DndDroppableSnapshot,
  DndDropResult,
  DndProviderProps,
  DndWrapperProps,
  DraggableItemProps,
} from "./app-dnd";

// AppProfileSelect
export { AppProfileSelect } from "./app-profile-select";
export type { AppProfileSelectProps } from "./app-profile-select";

// AppInvite
export { AppInvite } from "./app-invite";
export type { AppInviteProps } from "./app-invite";

// AppCardCycleSelector
export { AppCardCycleSelector } from "./app-card-cycle-selector";
export type { AppCardCycleSelectorProps } from "./app-card-cycle-selector";

// AppCardTypeSelector
export { AppCardTypeSelector } from "./app-card-type-selector";
export type { AppCardTypeSelectorProps } from "./app-card-type-selector";

// AppTabs
export { AppTabs } from "./app-tabs";
export type { AppTabsProps } from "./app-tabs";

// AppLanguage
export { AppLanguage } from "./language/app-language";
