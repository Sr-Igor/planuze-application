import { Plus, Trash2 } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { Permission } from "@/components/ui/permission";

import { IHeaderProps } from "../../type";

export const Header = <T,>({ state, handleState, page, translate, pathKey }: IHeaderProps<T>) => {
  const t = useLang();

  return (
    <span className="flex items-center justify-end gap-2 px-5">
      <Permission permission={["trash"]} feature={pathKey}>
        <Button
          variant={"outline"}
          onClick={() => {
            handleState({ open: true, mode: "trash" });
          }}
        >
          <Trash2 />
          {t.helper("trash")}
        </Button>
      </Permission>
      <Permission permission={["store"]} feature={pathKey}>
        <Button
          disabled={state.loading}
          onClick={() => {
            handleState({ open: true, mode: "store", item: undefined });
          }}
        >
          <Plus />
          {t.page[page](`${translate}.new`)}
        </Button>
      </Permission>
    </span>
  );
};
