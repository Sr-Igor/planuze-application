import { TabType } from '../types';

export const TAB_CONFIG = {
    data: { disabled: false },
    modules: { disabled: true }
} as const;

export function shouldDisableTab(tab: TabType, hasData: boolean): boolean {
    return TAB_CONFIG[tab].disabled && !hasData;
}

export function getTabConfig(tab: TabType) {
    return TAB_CONFIG[tab];
}

export function isTabDisabled(tab: TabType, hasData: boolean): boolean {
    return shouldDisableTab(tab, hasData);
}
