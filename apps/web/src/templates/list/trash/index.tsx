"use client";

import { useLang } from "@repo/language/hook";
import { Icon } from "@repo/ui/app";

import { usePrivateContext } from "@/templates/private/context";

import { BaseTemplate } from "../base";
import { ISingleTemplateProps } from "../base/types";
import { useActions as useDefaultActions } from "./use-actions";

export interface TrashTemplateProps<T extends { id: string }>
  extends Omit<ISingleTemplateProps<T>, "useActions"> {
  useActions?: ISingleTemplateProps<T>["useActions"];
  showLogs?: boolean;
}

export const TrashTemplate = <T extends { id: string }>(props: TrashTemplateProps<T>) => {
  const { feature } = usePrivateContext();

  //Translations
  const t = useLang();
  const pageT = t.page[props.path];

  const trashActions = props.useActions || useDefaultActions;

  //Render
  return (
    <BaseTemplate
      titlePage={
        <h1 className="mb-5 flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
          <Icon name={feature?.icon} className="hidden h-5 w-5 md:block" />
          <span className="text-red-500 uppercase">[{t.helper("trash")}]</span> {pageT("title")}
        </h1>
      }
      {...props}
      isTrash={true}
      useActions={trashActions}
    />
  );
};
