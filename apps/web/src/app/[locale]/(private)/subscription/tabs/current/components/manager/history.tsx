import { subscription_changes } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";


interface HistoryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  subscriptionChanges: subscription_changes[];
}

export const HistoryModal = ({ isOpen, onOpenChange, subscriptionChanges }: HistoryModalProps) => {
  const t = useLang();
  const { dates } = useIntlFormat();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[80vh] !max-w-[900px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-md font-bold md:text-2xl">
              {t.page.subscription("history.title")}
            </DialogTitle>
            <DialogDescription>{t.page.subscription("history.description")}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 w-full">
            {/* Desktop Table - Hidden on small screens */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.page.subscription("history.table.date")}</TableHead>
                    <TableHead>{t.page.subscription("history.table.type")}</TableHead>
                    <TableHead>{t.page.subscription("history.table.current_plan")}</TableHead>
                    <TableHead>{t.page.subscription("history.table.new_plan")}</TableHead>
                    <TableHead>{t.page.subscription("history.table.effective_date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionChanges.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                        {t.page.subscription("history.empty")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscriptionChanges.map((change) => (
                      <TableRow key={change.id}>
                        <TableCell>
                          {change.createdAt ? dates.format(new Date(change.createdAt)) : "N/A"}
                        </TableCell>
                        <TableCell>
                          {t.page.subscription(`history.change_type.${change.change_type}`)}
                        </TableCell>
                        <TableCell>{change.from_plan?.title || "-"}</TableCell>
                        <TableCell>{change.to_plan?.title || "-"}</TableCell>
                        <TableCell>
                          {change.effective_date
                            ? dates.format(new Date(change.effective_date))
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards - Visible on small screens */}
            <div className="space-y-3 md:hidden">
              {subscriptionChanges.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  {t.page.subscription("history.empty")}
                </div>
              ) : (
                subscriptionChanges.map((change) => (
                  <Card key={change.id} className="w-full">
                    <CardContent className="space-y-2 p-4">
                      <div className="flex items-start justify-between">
                        <div className="text-sm font-medium">
                          {change.createdAt ? dates.format(new Date(change.createdAt)) : "N/A"}
                        </div>
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                          {t.page.subscription(`history.change_type.${change.change_type}`)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-muted-foreground text-xs">
                          {t.page.subscription("history.table.current_plan")}:
                        </div>
                        <div className="text-sm font-medium">{change.from_plan?.title || "-"}</div>
                      </div>

                      <div className="text-muted-foreground flex items-center justify-center">
                        <div className="bg-border h-px w-4"></div>
                        <div className="px-2 text-xs">→</div>
                        <div className="bg-border h-px w-4"></div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-muted-foreground text-xs">
                          {t.page.subscription("history.table.new_plan")}:
                        </div>
                        <div className="text-sm font-medium">{change.to_plan?.title || "-"}</div>
                      </div>

                      <div className="border-t pt-2">
                        <div className="text-muted-foreground text-xs">
                          {t.page.subscription("history.table.effective_date")}:
                        </div>
                        <div className="text-sm">
                          {change.effective_date
                            ? dates.format(new Date(change.effective_date))
                            : "N/A"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
