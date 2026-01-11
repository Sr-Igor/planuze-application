'use client';

import { PrivateTemplate } from '@/templates/private';

export interface IPrivateLayoutProps {
    children?: React.ReactNode;
}

export default function Page({ children }: IPrivateLayoutProps) {
    return <PrivateTemplate>{children}</PrivateTemplate>;
}
