import { State } from '../../../types';

export interface IHandleDestroyProps {
    services: any;
    state: State;
    data: any;
}

export const handleDestroy = ({ services, state, data }: IHandleDestroyProps) => {
    const destroyers = {
        column: services.column.destroy,
        card: services.card.destroy,
        cycle: services.cycle.destroy,
        cardType: services.cardType.destroy,
        member: services.member.destroy,
        allocation: services.allocation.destroy,
        config: services.config.destroy,
        globalAllocation: services.globalAllocation.destroy,
        tool: services.tool.destroy
    };

    const type = state.type as keyof typeof destroyers;
    if (!type) return;

    const destroyer = destroyers[type];
    const item = state[type];

    if (destroyer) destroyer.mutate({ id: item?.id, query: data });
};
