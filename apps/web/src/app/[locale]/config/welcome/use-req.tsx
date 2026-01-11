import { useCompany } from '@/api/callers/company';
import { useInvite } from '@/api/callers/invite';
import { useUserSet } from '@/hooks/user-set';

export const useReq = () => {
    const { setter } = useUserSet();

    const { me, feedback } = useInvite({
        enabledMe: true,
        callbacks: {
            feedback: {
                onSuccess: (data) => {
                    if (data.invite.accepted) {
                        setter(data.user);
                    }
                }
            }
        }
    });

    const { store } = useCompany({
        callbacks: {
            store: {
                onSuccess: (user) => {
                    setter(user as any);
                }
            }
        }
    });

    return {
        store,
        feedback,
        me
    };
};
