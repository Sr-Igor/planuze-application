import { IUseLoadingProps, IUseLoadingReturnProps } from '../types';

export const useLoading = ({ services, kanbanShow }: IUseLoadingProps): IUseLoadingReturnProps => {
    return {
        cycle: {
            index: false,
            show: services.cycle.show.isPending,
            action: services.cycle.update.isPending || services.cycle.store.isPending,
            destroy: services.cycle.destroy.isPending,
            many: services.cycle.many.isPending,
            trash: services.cycle.trash.isPending,
            restore: services.cycle.restore.isPending
        },
        column: {
            index: false,
            show: false,
            action: services.column.update.isPending || services.column.store.isPending,
            destroy: services.column.destroy.isPending,
            many: services.column.many.isPending,
            trash: services.column.trash.isPending,
            restore: services.column.restore.isPending
        },
        card: {
            index: services.card.index.isPending,
            show: services.card.show.isPending,
            action: services.card.update.isPending || services.card.store.isPending,
            destroy: services.card.destroy.isPending,
            many: services.card.many.isPending,
            trash: services.card.trash.isPending,
            restore: services.card.restore.isPending
        },
        cardType: {
            index: services.cardType.index.isPending || services.cardType.index.isPlaceholderData,
            show: false,
            action: services.cardType.update.isPending || services.cardType.store.isPending,
            destroy: services.cardType.destroy.isPending,
            many: false,
            trash: services.cardType.trash.isPending,
            restore: services.cardType.restore.isPending
        },
        member: {
            index: services.member.index.isPending,
            show: false,
            action: services.member.store.isPending,
            destroy: services.member.destroy.isPending,
            many: false,
            trash: services.member.trash.isPending,
            restore: services.member.restore.isPending
        },
        allocation: {
            index: services.allocation.index.isPending,
            show: false,
            action: services.allocation.update.isPending || services.allocation.store.isPending,
            destroy: services.allocation.destroy.isPending,
            many: false,
            trash: services.allocation.trash.isPending,
            restore: services.allocation.restore.isPending
        },
        kanban: {
            index: false,
            show: kanbanShow.isPending || kanbanShow.isPlaceholderData,
            action: false,
            destroy: false,
            many: false,
            trash: false,
            restore: false
        },
        report: {
            index: services.report.index.isPending || services.report.index.isPlaceholderData,
            exported: services.report.exported.isPending,
            show: false,
            action: false,
            destroy: false,
            many: false,
            trash: false,
            restore: false
        },
        config: {
            index: services.config.index.isPending || services.config.index.isPlaceholderData,
            show: false,
            action: services.config.update.isPending || services.config.store.isPending,
            destroy: services.config.destroy.isPending,
            many: false,
            trash: services.config.trash.isPending,
            restore: services.config.restore.isPending
        },
        globalAllocation: {
            index: services.globalAllocation.index.isPending || services.globalAllocation.index.isPlaceholderData,
            show: false,
            action: services.globalAllocation.update.isPending || services.globalAllocation.store.isPending,
            destroy: services.globalAllocation.destroy.isPending,
            many: false,
            trash: services.globalAllocation.trash.isPending,
            restore: services.globalAllocation.restore.isPending
        },
        tool: {
            index: services.tool.index.isPending || services.tool.index.isPlaceholderData,
            show: false,
            action: services.tool.update.isPending || services.tool.store.isPending,
            destroy: services.tool.destroy.isPending,
            many: false,
            trash: services.tool.trash.isPending,
            restore: services.tool.restore.isPending
        },
        destroy:
            services.card.destroy.isPending ||
            services.column.destroy.isPending ||
            services.cycle.destroy.isPending ||
            services.cardType.destroy.isPending ||
            services.member.destroy.isPending ||
            services.allocation.destroy.isPending ||
            services.config.destroy.isPending ||
            services.globalAllocation.destroy.isPending ||
            services.tool.destroy.isPending
    };
};
