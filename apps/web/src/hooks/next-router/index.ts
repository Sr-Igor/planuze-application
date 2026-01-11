import { useRouter } from 'next/navigation';

import { set } from '@/store/modules/module/actions';

import { useAccess } from '../access';
import { useModal } from '../modal';
import { useAppDispatch } from '../redux';

export const useNextRouter = () => {
    const router = useRouter();

    const { setModal } = useModal();

    const { access } = useAccess();
    const dispatch = useAppDispatch();

    return (moduleId: string) => {
        if (!moduleId) return;

        setModal({ redirect: true });

        setTimeout(() => {
            dispatch(set({ moduleId }));

            const features = moduleId
                ? access?.[moduleId].features.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                : [];

            const firstSidebarFeature = features.find(
                (f) => f.sidebar && (f.actions.includes('index') || f.actions.includes('show'))
            );

            const firstIndexFeature = firstSidebarFeature?.route || firstSidebarFeature?.path;

            firstIndexFeature && router.replace(`/${firstIndexFeature}`);

            setTimeout(() => {
                setModal({ redirect: false });
            }, 100);
        }, 200);
    };
};
