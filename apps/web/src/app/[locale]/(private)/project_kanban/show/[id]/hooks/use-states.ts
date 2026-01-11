import { OnOpenCardFormProps } from '../modules/dnd/types';
import { Feature, IUseStatesReturnProps, State } from '../types';
import { IParams } from './use-query/types';

export interface IUseStatesProps {
    handleState: (s: Partial<State>) => void;
    setParams: (p: Partial<IParams>) => void;
}

export const useStates = ({ handleState, setParams }: IUseStatesProps): IUseStatesReturnProps => {
    return {
        cycle: {
            open: () => handleState({ type: 'cycle', modes: ['show'] }),
            form: (c) => handleState({ type: 'cycle', modes: [c ? 'update' : 'store'], cycle: c }),
            delete: (c) => handleState({ type: 'cycle', modes: ['destroy'], cycle: c })
        },
        card: {
            trash: () => handleState({ type: 'card', modes: ['trash'] }),
            delete: (c) => handleState({ type: 'card', modes: ['destroy'], card: c }),
            update: ({ columnId, card, anchor }: OnOpenCardFormProps) => {
                handleState({
                    type: 'card',
                    modes: ['update'],
                    card: card,
                    columnId: columnId,
                    anchor
                });
            },
            store: ({ columnId, card, anchor, close, forcedMode }: OnOpenCardFormProps) => {
                const data: Partial<State> = {
                    type: 'card',
                    modes: ['store'],
                    card: card,
                    columnId: columnId,
                    forcedMode,
                    anchor
                };

                close !== undefined && (data.close = close);

                handleState(data);
            },
            restore: (c) => handleState({ type: 'card', modes: ['restore'], card: c }),
            move: (c, close) => {
                handleState({ type: 'card', modes: ['move'], card: c, close });
            },
            change: (c, close) => {
                handleState({ type: 'card', modes: ['change'], card: c, close });
            }
        },
        cardType: {
            open: () => handleState({ type: 'cardType', modes: ['show'] }),
            form: (c) => handleState({ type: 'cardType', modes: [c ? 'update' : 'store'], cardType: c }),
            delete: (c) => handleState({ type: 'cardType', modes: ['destroy'], cardType: c })
        },
        column: {
            open: () => handleState({ type: 'column', modes: ['show'] }),
            form: (c) => handleState({ type: 'column', modes: [c ? 'update' : 'store'], column: c }),
            delete: (c) => handleState({ type: 'column', modes: ['destroy'], column: c })
        },
        member: {
            open: () => handleState({ type: 'member', modes: ['show'] }),
            form: (c) => handleState({ type: 'member', modes: [c ? 'update' : 'store'], member: c }),
            delete: (c) => handleState({ type: 'member', modes: ['destroy'], member: c }),
            restore: (c) => handleState({ type: 'member', modes: ['restore'], member: c })
        },
        allocation: {
            open: () => handleState({ type: 'allocation', modes: ['show'] }),
            form: (c) => handleState({ type: 'allocation', modes: [c ? 'update' : 'store'], allocation: c }),
            delete: (c) => handleState({ type: 'allocation', modes: ['destroy'], allocation: c }),
            restore: (c) => handleState({ type: 'allocation', modes: ['restore'], allocation: c }),
            trash: () => handleState({ type: 'allocation', modes: ['trash'] })
        },
        logs: {
            open: ({ item, type }: { item: any; type: Feature }) => handleState({ modes: ['logs'], [type]: item, type })
        },
        globalAllocation: {
            open: () => handleState({ type: 'globalAllocation', modes: ['show'] }),
            form: (c) =>
                handleState({ type: 'globalAllocation', modes: [c ? 'update' : 'store'], globalAllocation: c }),
            delete: (c) => handleState({ type: 'globalAllocation', modes: ['destroy'], globalAllocation: c }),
            restore: (c) => handleState({ type: 'globalAllocation', modes: ['restore'], globalAllocation: c }),
            trash: () => handleState({ type: 'globalAllocation', modes: ['trash'] })
        },
        config: {
            open: () => handleState({ type: 'config', modes: ['show'] }),
            form: (c) => handleState({ type: 'config', modes: [c ? 'update' : 'store'], config: c }),
            delete: (c) => handleState({ type: 'config', modes: ['destroy'], config: c })
        },
        tool: {
            open: () => handleState({ type: 'tool', modes: ['show'] }),
            form: (c) => handleState({ type: 'tool', modes: [c ? 'update' : 'store'], tool: c }),
            delete: (c) => handleState({ type: 'tool', modes: ['destroy'], tool: c }),
            restore: (c) => handleState({ type: 'tool', modes: ['restore'], tool: c }),
            trash: () => handleState({ type: 'tool', modes: ['trash'] })
        }
    };
};
