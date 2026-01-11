'use client';

import { PublicTemplate } from '@/templates/public';

export interface IPublicLayoutProps {
    children?: React.ReactNode;
}

export default function Page({ children }: IPublicLayoutProps) {
    return <PublicTemplate>{children}</PublicTemplate>;
}
