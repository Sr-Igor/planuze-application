'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import './.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, speed: 500 });

export const Progress = () => {
    const pathname = usePathname();

    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleComplete = () => NProgress.done();

        handleStart();
        handleComplete();

        return () => {
            handleComplete();
        };
    }, [pathname]);

    return null;
};
