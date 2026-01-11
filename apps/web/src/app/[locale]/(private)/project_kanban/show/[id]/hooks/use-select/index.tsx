import { IUseSelectProps, IUseSelectReturnProps, Selects } from '../use-req/types';
import { useIndexObjective } from './queries/objective';
import { useIndexProfile } from './queries/profile';
import { useIndexVersion } from './queries/version';
import { useIndexWorkType } from './queries/work-type';

export const useSelect = ({ params, setParams, kanban }: IUseSelectProps): IUseSelectReturnProps => {
    const indexProfile = useIndexProfile({ search: params['select-profile'], kanban });
    const indexWorkType = useIndexWorkType({ search: params['select-work-type'], kanban });
    const indexObjective = useIndexObjective({ search: params['select-objective'], kanban });
    const indexVersion = useIndexVersion({ search: params['select-version'], kanban });

    const handleSearch = (select: Selects, value?: string | null) => {
        switch (select) {
            case 'profile':
                return setParams({ 'select-profile': value ?? undefined });
            case 'workType':
                return setParams({ 'select-work-type': value ?? undefined });
            case 'objective':
                return setParams({ 'select-objective': value ?? undefined });
            case 'version':
                return setParams({ 'select-version': value ?? undefined });
        }
    };

    const search = {
        profile: params['select-profile'],
        workType: params['select-work-type'],
        objective: params['select-objective'],
        version: params['select-version']
    };

    return {
        profile: indexProfile,
        workType: indexWorkType,
        objective: indexObjective,
        version: indexVersion,
        handleSearch,
        search
    };
};
