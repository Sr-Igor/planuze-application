"use client";

import { UseFormReturn } from "react-hook-form";

import { EditorController } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { project_kanban_cycle_card } from "@repo/types";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";

import { Collapsible } from "../../collapsible";
import { Comment } from "../../comment";
import { ScrollColumn } from "../../scroll-column";

export interface IDescriptionProps {
  hook: UseFormReturn<any>;
  item?: project_kanban_cycle_card;
}

export const Description = ({ hook, item }: IDescriptionProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_cycle_card");

  const lang = useLang();
  const t = lang.page.kanban;

  const { page } = useKanbanShow();
  return (
    <ScrollColumn>
      <Collapsible title={t("card-form-edit.collapsible.description")}>
        <EditorController
          name="description"
          disabled={!perm.update}
          control={hook.control}
          skipHtmlFor={true}
          field="editor"
          placeholder={
            !perm.update ? t("no_value.description") : t("card-form-edit.placeholder.description")
          }
          mentionQuery={{}}
          hashtagQuery={
            page.id
              ? {
                  project_kanban_id: page.id,
                }
              : undefined
          }
          hashRefLink={(id) => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("card_id", id);
            window.open(currentUrl.toString(), "_blank", "noopener,noreferrer");
          }}
          mentionRefLink={(id) => {
            window.open(`/profile/show/${id}`, "_blank", "noopener,noreferrer");
          }}
        />
      </Collapsible>

      <Collapsible title={t("card-form-edit.collapsible.accept_description")}>
        <EditorController
          name="accept_description"
          disabled={!perm.update}
          control={hook.control}
          skipHtmlFor={true}
          field="editor"
          placeholder={
            !perm.update
              ? t("no_value.accept_description")
              : t("card-form-edit.placeholder.accept_description")
          }
          mentionQuery={{}}
          hashtagQuery={
            page.id
              ? {
                  project_kanban_id: page.id,
                }
              : undefined
          }
          hashRefLink={(id) => {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("card_id", id);
            window.open(currentUrl.toString(), "_blank", "noopener,noreferrer");
          }}
          mentionRefLink={(id) => {
            window.open(`/profile/show/${id}`, "_blank", "noopener,noreferrer");
          }}
        />
      </Collapsible>

      <Collapsible title={t("card-form-edit.collapsible.comments")}>
        <Comment comments={item?.project_kanban_cycle_card_comments || []} />
      </Collapsible>
    </ScrollColumn>
  );
};
