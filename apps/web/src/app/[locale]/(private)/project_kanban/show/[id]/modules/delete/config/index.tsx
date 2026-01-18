import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";
import { AppDialog } from "@repo/ui-new";

interface DestroyConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
}

export const DestroyConfig = ({ open, onOpenChange, onDestroy, loading }: DestroyConfigProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <AppDialog
      title={t("delete.config.title")}
      description={t("delete.config.description")}
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
