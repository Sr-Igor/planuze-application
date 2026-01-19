import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui";

interface DestroyGlobalAllocationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
}

export const DestroyGlobalAllocation = ({
  open,
  onOpenChange,
  onDestroy,
  loading,
}: DestroyGlobalAllocationProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <AppDialog
      title={t("delete.globalAllocation.title")}
      description={t("delete.globalAllocation.description")}
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
