import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

interface DestroyMemberProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
}

export const DestroyMember = ({ open, onOpenChange, onDestroy, loading }: DestroyMemberProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <AppDialog
      title={t("delete.member.title")}
      description={t("delete.member.description")}
      open={open}
      loading={loading}
      onOpenChange={onOpenChange}
      footer={
        <Button variant="destructive" onClick={onDestroy} loading={loading}>
          {lang.helper("delete")}
        </Button>
      }
    />
  );
};
