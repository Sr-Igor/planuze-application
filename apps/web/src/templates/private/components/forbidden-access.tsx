import { Ban } from "lucide-react";

import { module } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { useAppDispatch } from "@/hooks/redux";
import { set } from "@/store/modules/module/actions";

interface ForbiddenAccessProps {
  suggestedModules: module[];
}

export const ForbiddenAccess = ({ suggestedModules }: ForbiddenAccessProps) => {
  const t = useLang();
  const dispatch = useAppDispatch();

  const handleModuleChange = (moduleId: string) => {
    dispatch(set({ moduleId }));
  };

  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-6 p-6 text-center text-lg font-semibold">
      <Ban size={108} className="text-destructive" />
      <div>
        <h1 className="text-foreground mb-4 text-xl font-semibold sm:text-4xl md:text-3xl">
          {t.warning("forbidden.title")}
        </h1>
        <p className="text-sm sm:text-base">{t.warning("forbidden.description")}</p>
      </div>

      {suggestedModules.length > 0 && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm sm:text-base">{t.warning("forbidden.list")}</p>
          <ul className="flex flex-col items-center gap-3">
            {suggestedModules.map((item) => (
              <li
                key={item.id}
                className="flex w-full items-center justify-between gap-2 rounded-md border p-2 sm:w-auto"
              >
                <span className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                  <Icon name={item?.icon} size={20} />
                  {t.module(item.title)}
                </span>
                <Button onClick={() => handleModuleChange(item.id)} variant={"ghost"} size="sm">
                  {t.warning("forbidden.change")}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
