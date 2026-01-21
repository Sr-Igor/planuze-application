import { IUseCallersProps, IUseCallersReturnProps } from "../types";

export const useCallers = ({ req, general }: IUseCallersProps): IUseCallersReturnProps => {
  return {
    column: {
      onSubmit: (data) => {
        if (general.state.column) {
          req.services.column.update.mutate({ id: general.state.column.id, body: data });
        } else {
          const form = {
            ...data,
            project_kanban_cycle_id: req.page.cycle?.id,
            project_id: req.page.kanban?.project_id,
            project_kanban_id: req.page.kanban?.id,
          };

          req.services.column.store.mutate(form);
        }
      },
      onMany: (items) => {
        const ids = items.map((item) => item.id).join(",");
        const data = items.map((item) => ({
          id: item.id,
          order: item.order,
        }));
        req.services.column.many.mutate({ ids, body: { data } });
      },
      onTrash: () => req.services.column.trash.data,
      onRestore: (data) => {
        req.services.column.restore.mutate(data?.id);
      },
    },
    member: {
      onSubmit: (data) => {
        const form = {
          ...data,
          project_id: req.page.kanban?.project_id,
        };

        req.services.member.store.mutate(form);
      },
      onRestore: (data) => {
        req.services.member.restore.mutate(data?.id);
      },
      onDelete: () => {
        req.services.member.destroy.mutate();
      },
      onTrash: () => req.services.member.trash.data,
      onIndex: () => req.services.member.index.data,
    },
    cycle: {
      onSubmit: (data) => {
        if (general.state.cycle) {
          req.services.cycle.update.mutate({ id: general.state.cycle.id, body: data });
        } else {
          const form = {
            ...data,
            project_kanban_id: req.page.kanban?.id,
            project_id: req.page.kanban?.project_id,
          };

          req.services.cycle.store.mutate(form);
        }
      },
      onTrash: () => req.services.cycle.trash.data,
      onRestore: (item) => {
        req.services.cycle.restore.mutate({ id: item.id });
      },
      onMany: (items) => {
        const ids = items.map((item) => item.id).join(",");
        const data = items.map((item) => ({
          id: item.id,
          order: item.order,
        }));
        req.services.cycle.many.mutate({ ids, body: { data } });
      },
    },
    card: {
      onIndex: () => req.services.card.index.data,
      onShow: () => req.services.card.show?.data,
      onSubmit: (data, close) => {
        close !== undefined && general.handleState({ close });

        if (!general.state.card || general.state.forcedMode === "store") {
          const form = {
            ...data,
            project_id: data.project_id || req.page.kanban?.project_id,
            project_kanban_id: data.project_kanban_id || req.page.kanban?.id,
            project_kanban_cycle_id: data.project_kanban_cycle_id || req.page.cycle?.id,
            project_kanban_cycle_column_id:
              data.project_kanban_cycle_column_id || general.state.columnId,
          };

          req.services.card.store.mutate(form);
        } else {
          req.services.card.update.mutate(data);
        }
      },
      onTrash: () => req.services.card.trash.data,
      onRestore: (data) => {
        req.services.card.restore.mutate(data?.id);
      },
    },
    cardType: {
      onSubmit: (data) => {
        if (general.state.cardType) {
          req.services.cardType.update.mutate(data);
        } else {
          const form = {
            ...data,
            project_kanban_cycle_id: req.page.cycle?.id,
            project_id: req.page.kanban?.project_id,
            project_kanban_id: req.page.kanban?.id,
          };

          req.services.cardType.store.mutate(form);
        }
      },
      onTrash: () => req.services.cardType.trash.data,
      onRestore: (data) => {
        req.services.cardType.restore.mutate(data?.id);
      },
    },
    allocation: {
      onTrash: () => req.services.allocation.trash.data,
      onRestore: (data) => {
        req.services.allocation.restore.mutate(data?.id);
      },
      onSubmit: (data) => {
        if (general.state.allocation?.id) {
          req.services.allocation.update.mutate(data);
        } else {
          const form = {
            ...data,
            profile_id: data.profile_id || general.state.allocation?.profile_id,
            project_member_id: general.state.allocation?.project_member_id,
            project_kanban_cycle_id: req.page.cycle?.id,
            project_id: req.page.kanban?.project_id,
            project_kanban_id: req.page.kanban?.id,
          };

          req.services.allocation.store.mutate(form);
        }
      },
      onDelete: () => {
        req.services.allocation.destroy.mutate();
      },
    },
    report: {
      onIndex: () => req.services.report.index.data,
      onExport: () => req.services.report.exported.mutate({}),
    },
    config: {
      onSubmit: (data) => {
        if (general.state.config) {
          req.services.config.update.mutate(data);
        } else {
          req.services.config.store.mutate(data);
        }
      },
      onTrash: () => req.services.config.trash.data,
      onRestore: (data) => {
        req.services.config.restore.mutate(data?.id);
      },
    },
    globalAllocation: {
      onTrash: () => req.services.globalAllocation.trash.data,
      onRestore: (data) => {
        req.services.globalAllocation.restore.mutate(data?.id);
      },
      onSubmit: (data) => {
        if (general.state.globalAllocation?.id) {
          req.services.globalAllocation.update.mutate(data);
        } else {
          const form = {
            ...data,
            project_id: req.page.kanban?.project_id,
          };

          req.services.globalAllocation.store.mutate(form);
        }
      },
      onDelete: () => {
        req.services.globalAllocation.destroy.mutate();
      },
    },
    tool: {
      onTrash: () => req.services.tool.trash.data,
      onRestore: (data) => {
        req.services.tool.restore.mutate(data?.id);
      },
      onSubmit: (data) => {
        if (general.state.tool?.id) {
          req.services.tool.update.mutate(data);
        } else {
          const form = {
            ...data,
            project_id: req.page.kanban?.project_id,
          };

          req.services.tool.store.mutate(form);
        }
      },
      onDelete: () => {
        req.services.tool.destroy.mutate();
      },
    },
    onDestroy: req.destroy,
  };
};
