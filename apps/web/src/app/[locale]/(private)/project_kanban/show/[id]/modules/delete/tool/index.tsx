import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

interface DestroyToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
}

export const DestroyTool = ({ open, onOpenChange, onDestroy, loading }: DestroyToolProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <AppDialog
      title={t("delete.tool.title")}
      description={t("delete.tool.description")}
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
