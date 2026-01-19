"use client";

import { useEffect } from "react";

import { project_kanban_cycle_card_type } from "@repo/types";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Icon } from "@repo/ui";

import { useProjectKanbanCycleCard } from "@repo/api/web/callers/project_kanban_cycle_card";
import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useAuth } from "@repo/redux/hook";
import { cn } from "@repo/ui";

import { useForm } from "./use-form";

export interface ICardFormProps {
  cardType: project_kanban_cycle_card_type;
  columnId: string;
  parentCardId: string;
  onCancel?: () => void;
}

export const KanbanCardForm = ({ cardType, columnId, onCancel, parentCardId }: ICardFormProps) => {
  const { profile } = useAuth();
  const { page } = useKanbanShow();

  const { store } = useProjectKanbanCycleCard({
    cycleId: page.cycle?.id,
    filters: { project_kanban_id: page.kanban?.id },
    callbacks: {
      store: {
        onSuccess: () => {
          onCancel?.();
        },
      },
    },
  });

  const loading = store.isPending;

  const { Form, hook, formProps } = useForm({
    disabled: false,
  });

  // Garante que o input seja focado após a renderização completa
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>("#fake-card-form-title");
      if (input) {
        input.focus();
        input.select();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    const formData = hook.getValues();
    if (formData.title && formData.title.trim()) {
      store.mutate({
        ...formData,
        position: "last",
        profile_id: profile?.id,
        project_id: page.kanban?.project_id,
        project_kanban_id: page.kanban?.id,
        project_kanban_cycle_id: page.cycle?.id,
        project_kanban_cycle_column_id: columnId,
        project_kanban_cycle_card_type_id: cardType.id,
        card_id: parentCardId !== "unlinked" ? parentCardId : undefined,
      });
    }
  };

  const handleBlur = () => {
    const formData = hook.getValues();
    if (formData.title && formData.title.trim()) {
      !loading && handleSave();
    } else {
      onCancel?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel?.();
    }
  };

  return (
    <Card
      className={cn(
        "rounded-sm transition-all duration-200 hover:shadow-md",
        "relative min-h-[100px] overflow-hidden p-3",
        loading && "pointer-events-none opacity-50"
      )}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute top-0 left-0 h-full w-1"
        style={{
          backgroundColor: cardType?.color || "transparent",
        }}
      />
      <span
        className={cn(
          "flex flex-col justify-between gap-5 transition-opacity duration-300 ease-in-out"
        )}
      >
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="flex w-full items-center gap-1">
              <Icon
                name={cardType?.icon}
                className="h-4 w-4"
                style={{
                  color: cardType?.color || "transparent",
                }}
              />
              <div className="flex-1">
                <Form
                  fields={formProps.fields.map((field) =>
                    field.name === "title" ? { ...field, onBlur: handleBlur } : field
                  )}
                  hook={hook}
                  onSubmit={(e) => {
                    if (loading) return;
                    e.preventDefault();
                    handleSave();
                  }}
                  className="w-full"
                />
              </div>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0"></CardContent>
      </span>
    </Card>
  );
};
