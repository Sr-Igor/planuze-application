import { DependencyService } from './services';

export interface DependencyServiceProps {
    companyView: any;
    listActions: any[];
    getActionKey: (featurePath: string, actionTitle?: string) => string;
}

export interface SelectionServiceProps {
    dependencyService: DependencyService;
    selectedActionKeys: Set<string>;
    setSelectedActionKeys: (keys: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
}

export interface SelectionHelpersProps {
    allActions: string[];
    getActionKey: (featurePath: string, actionTitle?: string) => string;
    selectedActionKeys: Set<string>;
}

export interface DependencyResult {
    isDep: boolean;
    listNames: { feature: string; action: string }[];
}

export type { DependencyService } from '../services/dependency-service';
