import { useLang } from "@repo/language/hook";

import { Input } from "@repo/form";

export interface SearchProps {
  value?: string;
  setValue: (value?: string) => void;
  disabled: boolean;
}

export const Search = ({ value, setValue, disabled }: SearchProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Input
      id="search"
      icon="Search"
      placeholder={t("component.line.search")}
      rootClassName="w-40 h-8 xl:w-50"
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value || undefined)}
    />
  );
};
