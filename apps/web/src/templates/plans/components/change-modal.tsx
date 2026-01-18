import { useLang } from "@repo/language/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui-new";

interface ChangePlanModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  planToChange: any;
  currentPlanObj: any;
  endDateFormatted: string | null;
  handleConfirmChangePlan: () => void;
  upgrade: { isPending: boolean };
}

export const ChangePlanModal = ({
  isOpen,
  onOpenChange,
  planToChange,
  currentPlanObj,
  endDateFormatted,
  handleConfirmChangePlan,
  upgrade,
}: ChangePlanModalProps) => {
  const t = useLang();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t.page.plans("change_modal.title")}</DialogTitle>
          <DialogDescription>
            {planToChange && currentPlanObj && (
              <>
                {t.page.plans("change_modal.description", {
                  current_plan: currentPlanObj.title,
                  new_plan: planToChange.title,
                })}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {planToChange && (
          <div className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4 text-sm dark:bg-gray-900">
              {currentPlanObj && planToChange.price > currentPlanObj.price ? (
                <p>{t.page.plans("change_modal.high_price")}</p>
              ) : (
                <p>{t.page.plans("change_modal.low_price", { end_date: endDateFormatted })}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                {t.page.plans("change_modal.cancel")}
              </Button>
              <Button
                onClick={handleConfirmChangePlan}
                disabled={!planToChange?.price_id}
                loading={upgrade.isPending}
              >
                {t.page.plans("change_modal.confirm")}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
