export { useQueryOptimized } from '../helpers/use-query-optimized';

export const QueryPerformanceUtils = {
    measureUpdate: (fn: () => void) => {
        const start = performance.now();
        fn();
        const end = performance.now();
        return end - start;
    },

    createDebounce: (delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (fn: () => void) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fn, delay);
        };
    },

    createThrottle: (delay: number) => {
        let lastCall = 0;
        return (fn: () => void) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                fn();
            }
        };
    }
};

export const QueryConfigs = {
    highPerformance: {
        debounceMs: 200,
        enableCache: true,
        maxCacheSize: 100,
        enablePerformanceMetrics: true
    },

    simple: {
        debounceMs: 100,
        enableCache: false,
        enablePerformanceMetrics: false
    },

    persistent: {
        debounceMs: 300,
        enableCache: true,
        enableLocalStorage: true,
        maxHistorySize: 50,
        enableUndoRedo: true
    },

    debug: {
        debounceMs: 0,
        enableCache: true,
        enablePerformanceMetrics: true,
        enableLocalStorage: true,
        enableUndoRedo: true
    }
};
