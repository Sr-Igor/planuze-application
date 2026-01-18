import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";
import { AppDialog } from "@repo/ui-new";

interface DestroyAllocationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
}

export const DestroyAllocation = ({
  open,
  onOpenChange,
  onDestroy,
  loading,
}: DestroyAllocationProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <AppDialog
      title={t("delete.allocation.title")}
      description={t("delete.allocation.description")}
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
