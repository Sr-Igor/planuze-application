import { Plus } from "lucide-react";

import { project_kanban_cycle_card_type } from "@repo/types";

import { SimpleSelect } from "@repo/form";
import { AppCardTypeSelector } from "@/components/ui/app-card-type-selector";

import { useKanbanShow } from "../../../../context";

export interface IAddCardProps {
  loading: boolean;
  handleAddCard: (item: project_kanban_cycle_card_type) => void;
}

export const AddCard = ({ loading, handleAddCard }: IAddCardProps) => {
  const { data } = useKanbanShow();

  const cardTypes = data.cardsTypes
    ?.filter((item) => !item.principal)
    ?.map((item) => ({
      label: item.title,
      value: item.id,
      item,
    }));
  return (
    <SimpleSelect
      options={cardTypes}
      disabled={loading}
      triggerClassName="w-full!"
      customTrigger={() => {
        return (
          <span className="bg-secondary hover:bg-secondary/80 flex h-8 w-full! items-center justify-center rounded-md">
            <Plus className="h-4 w-4" />
          </span>
        );
      }}
      onChange={(_, item) => {
        if (item) handleAddCard(item);
      }}
      formatterOptions={({ item }) => {
        return <AppCardTypeSelector item={item} />;
      }}
      modal={true}
    />
  );
};
