import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Input as InputComponent, Label } from "@repo/ui";

import { useDebounce } from "@repo/hooks/debounce";

export interface InputProps {
  keyItem: string;
  value?: string;
  setValue: (value: string) => void;
  disabled: boolean;
}

export const Input = ({ value, setValue, disabled, keyItem }: InputProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const [intValue, setIntValue] = useState<string>("");

  const intDebounced = useDebounce(intValue, 500);

  useEffect(() => {
    setValue(intDebounced);
  }, [intDebounced]);

  useEffect(() => {
    intValue !== value && setIntValue(value || "");
  }, [value]);

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.${keyItem}`)}
      </Label>
      <InputComponent
        value={intValue}
        onChange={(e) => setIntValue(e.target.value || "")}
        className="text-foreground w-full xl:w-40"
        disabled={disabled}
        placeholder={t("component.line.type")}
      />
    </div>
  );
};
