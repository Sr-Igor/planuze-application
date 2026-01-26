import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Search } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { AppDialog, Badge, Button, Checkbox, Icon } from "@repo/ui";

interface FeatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedModule: any;
  availableFeatures: any[];
  selectedFeatures: string[];
  setSelectedFeatures: (ids: string[]) => void;
  saving: boolean;
  handleAddFeatures: () => void;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({
  open,
  onOpenChange,
  selectedModule,
  availableFeatures,
  selectedFeatures,
  setSelectedFeatures,
  saving,
  handleAddFeatures,
}) => {
  const t = useLang();

  // Estado para busca de features
  const [search, setSearch] = useState("");
  const filteredFeatures = availableFeatures.filter((feature: any) =>
    feature.title.toLowerCase().includes(search.toLowerCase())
  );

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
            title={selectedModule ? t.plan("features.add_to_plan") : t.plan("features.add")}
            description={
              selectedModule ? t.module(selectedModule?.title) : t.plan("features.select")
            }
            footer={
              <Button
                onClick={handleAddFeatures}
                disabled={saving || selectedFeatures.length === 0}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 transition-transform duration-200 group-hover:scale-110" />
                )}
                {saving ? t.plan("features.adding") : t.plan("features.add_many")}
              </Button>
            }
          >
            <div className="space-y-4 pt-1">
              <div className="relative mb-2">
                <span className="absolute top-2.5 left-2 text-zinc-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder={t.plan("features.search")}
                  className="focus:ring-primary/30 w-full rounded border border-zinc-200 bg-zinc-50 px-8 py-2 text-sm transition focus:ring-2 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={saving}
                  autoFocus
                />
              </div>
              {filteredFeatures.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="py-6 text-center text-gray-400 italic"
                >
                  {t.plan("features.all_added")}
                </motion.div>
              )}
              <div className="flex max-h-72 flex-col gap-4 overflow-y-auto pr-1">
                <AnimatePresence>
                  {filteredFeatures.map((feature: any) => {
                    const checked = selectedFeatures.includes(feature.id);
                    return (
                      <motion.label
                        key={feature.id}
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
                              setSelectedFeatures(
                                checked
                                  ? [...selectedFeatures, feature.id]
                                  : selectedFeatures.filter((id) => id !== feature.id)
                              );
                            }}
                            disabled={saving}
                            className="mr-2 scale-125 transition-transform duration-150"
                          />
                        </motion.div>
                        {feature.icon && <Icon name={feature.icon} className="text-lg" size={18} />}
                        <span className="truncate text-base font-medium">
                          {t.model(`${feature.path}`)}
                        </span>
                        {checked && (
                          <Badge
                            variant="secondary"
                            className="animate-fade-in ml-auto px-2 py-1 text-xs"
                          >
                            {t.plan("features.selected")}
                          </Badge>
                        )}
                      </motion.label>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </AppDialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
