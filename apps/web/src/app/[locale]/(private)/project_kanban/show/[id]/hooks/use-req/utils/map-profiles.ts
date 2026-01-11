import { project_kanban_cycle_allocation, project_member } from '@/api/generator/types';
import { IProfile } from '@/app/[locale]/(private)/project_kanban/show/[id]/types';

export interface IMapProfilesProps {
    allocations: project_kanban_cycle_allocation[];
    members: project_member[];
}

export const mapProfiles = ({ allocations, members }: IMapProfilesProps): IProfile[] => {
    const mappedAllocations = allocations
        .filter((allocation) => allocation.profile)
        .map((allocation) => ({
            avatar: allocation.profile?.user?.avatar || allocation.profile?.anonymous_avatar,
            name: allocation.profile?.user?.name || allocation.profile?.anonymous_name,
            id: allocation.profile?.id,
            profile_member_id: allocation.project_member_id,
            profile_id: allocation.profile?.id,
            unit: allocation.unit,
            time: allocation.time,
            member: allocation.project_member,
            allocation: allocation
        }));

    const mappedMembers = members.map((member) => ({
        avatar: member.profile?.user?.avatar || member.profile?.anonymous_avatar,
        name: member.profile?.user?.name || member.profile?.anonymous_name,
        id: undefined,
        profile_member_id: member.id,
        profile_id: member.profile?.id,
        unit: undefined,
        time: undefined,
        member: member,
        allocation: undefined
    }));

    const uniqueProfiles = [...mappedAllocations, ...mappedMembers].filter(
        (profile, index, self) => index === self.findIndex((t) => t.profile_member_id === profile.profile_member_id)
    );

    return uniqueProfiles;
};
