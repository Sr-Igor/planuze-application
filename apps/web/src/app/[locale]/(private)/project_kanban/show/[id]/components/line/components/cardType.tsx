import { useLang } from "@repo/language/hooks";
import { Label } from "@repo/ui-new";

import { CheckboxSelect } from "@repo/form";
import { AppCardTypeSelector } from "@/components/app-card-type-selector";

import { useKanbanShow } from "../../../context";

export interface CardTypeProps {
  value: any;
  setValue: (value: any) => void;
}

export const CardType = ({ value, setValue }: CardTypeProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { data } = useKanbanShow();

  const cardsTypes = data.cardsTypes?.map((cardType) => ({
    label: cardType.title,
    value: cardType.id,
    item: cardType,
  }));

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.card_type`)}
      </Label>
      <CheckboxSelect
        className="text-foreground w-full xl:w-40"
        options={cardsTypes}
        optionChildren={({ item }) => {
          return (
            <AppCardTypeSelector
              item={item}
              className="w-[calc(100%-30px)]"
              textClassName="text-left"
            />
          );
        }}
        value={value?.split(",")?.filter(Boolean) || []}
        onChange={(value) => {
          setValue(value?.join(",") || undefined);
        }}
      />
    </div>
  );
};
