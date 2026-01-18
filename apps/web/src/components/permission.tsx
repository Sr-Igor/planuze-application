import { useAccess } from '@/hooks/access';

export interface PermissionProps {
    children: React.ReactNode;
    permission: any;
    method?: 'any' | 'all';
    fallback?: React.ReactNode;
    feature?: string;
}

export const Permission = ({ children, permission, method = 'all', fallback = null, feature }: PermissionProps) => {
    const { permissions } = useAccess();

    if (method === 'all') {
        const every = permission.every((p: any) => permissions(feature)[p]);
        if (!every) return fallback;
    } else {
        const some = permission.some((p: any) => permissions(feature)[p]);
        if (!some) return fallback;
    }

    return <>{children}</>;
};
