import React, { useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { action, feature } from "@repo/types";
import { AppDialog, Badge, Button, Checkbox } from "@repo/ui";

interface ActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFeature: any;
  selectedModule: any;
  actions: action[];
  selectedActions: string[];
  setSelectedActions: (ids: string[]) => void;
  saving: boolean;
  handleSaveActions: () => void;
  feature: feature;
}

export const ActionsModal: React.FC<ActionsModalProps> = ({
  open,
  onOpenChange,
  selectedFeature,
  selectedModule,
  actions,
  selectedActions,
  setSelectedActions,
  saving,
  handleSaveActions,
  feature,
}) => {
  const t = useLang();

  // Atualiza os checkboxes ao abrir o modal
  useEffect(() => {
    if (open && selectedFeature) {
      const currentActionIds =
        selectedFeature?.plan_feature_actions?.map((pfa: any) => pfa.action_id) || [];
      setSelectedActions(currentActionIds);
    }
    if (open && !selectedFeature) {
      setSelectedActions([]);
    }
  }, [open, selectedFeature, setSelectedActions]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <AppDialog
            open={open}
            onOpenChange={onOpenChange}
            title={
              selectedFeature ? t.plan("actions_modal.edit_feature") : t.plan("actions_modal.edit")
            }
            description={selectedFeature ? selectedFeature?.title : ""}
            footer={
              <Button
                onClick={handleSaveActions}
                disabled={saving}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 transition-transform duration-200 group-hover:scale-110" />
                )}
                {saving ? t.plan("actions_modal.saving") : t.plan("actions_modal.save_permissions")}
              </Button>
            }
          >
            <div className="flex max-h-72 flex-col gap-4 overflow-y-auto pt-1 pr-1">
              {actions.map((action) => {
                const isActionAvailable = feature?.actions?.includes(action.id);
                if (!isActionAvailable) return null;
                const checked = selectedActions.includes(action.id);
                return (
                  <motion.label
                    key={action.id}
                    layout
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className={`box-border flex cursor-pointer items-center gap-4 rounded-lg border border-zinc-100 bg-white px-5 py-3 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800`}
                    style={{ position: "relative" }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.97 }}
                      animate={{ scale: checked ? 1.03 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex items-center justify-center"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(checked) => {
                          setSelectedActions(
                            checked
                              ? [...selectedActions, action.id]
                              : selectedActions.filter((id) => id !== action.id)
                          );
                        }}
                        disabled={saving}
                        className="mr-2 scale-125 transition-transform duration-150"
                      />
                    </motion.div>
                    <ShieldCheck
                      className={`h-4 w-4 transition-colors duration-200 ${checked ? "text-primary" : "text-zinc-400"}`}
                    />
                    <span className="truncate text-base font-medium">
                      {t.permission(`${action.title}`)}
                    </span>
                    {checked && (
                      <Badge
                        variant="secondary"
                        className="animate-fade-in ml-auto px-2 py-1 text-xs"
                      >
                        {t.plan("actions_modal.selected")}
                      </Badge>
                    )}
                  </motion.label>
                );
              })}
              {actions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="mt-2 rounded bg-zinc-50 px-2 py-2 text-sm text-gray-400 italic dark:bg-zinc-900"
                >
                  {t.plan("actions_modal.none_available")}
                </motion.div>
              )}
            </div>
          </AppDialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
