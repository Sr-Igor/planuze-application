import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown, PlusCircle, Shield, Trash2 } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui";

interface ModuleListProps {
  modules: any[];
  featuresByModule: Record<string, any[]>;
  planFeaturesByFeature: Record<string, any>;
  openModules: Record<string, boolean>;
  onToggleModule: (moduleId: string) => void;
  onAddFeature: (module: any) => void;
  onEditActions: (module: any, feature: any) => void;
  onDeleteFeature: (planFeature: any) => void;
  companyIdPlano?: string | number;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  featuresByModule,
  planFeaturesByFeature,
  openModules,
  onToggleModule,
  onAddFeature,
  onEditActions,
  onDeleteFeature,
  companyIdPlano,
}) => {
  const t = useLang();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState<any>(null);

  const filteredModules = modules.filter(
    (mod) => !mod.company_id || String(mod.company_id) === String(companyIdPlano)
  );

  const handleDeleteClick = (planFeature: any) => {
    setFeatureToDelete(planFeature);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (featureToDelete) {
      onDeleteFeature(featureToDelete);
      setDeleteDialogOpen(false);
      setFeatureToDelete(null);
    }
  };

  return (
    <>
      <ScrollArea className="max-h-[60vh] pr-2">
        <div className="space-y-8 px-3 pb-3">
          <AnimatePresence>
            {filteredModules.map((module) => {
              const features =
                featuresByModule[module.id]?.filter(
                  (feature) => planFeaturesByFeature[feature.id]
                ) || [];
              return (
                <motion.div
                  key={module.id}
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  <Collapsible
                    open={!!openModules[module.id]}
                    onOpenChange={() => onToggleModule(module.id)}
                    className="rounded-2xl border border-zinc-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {/* Cabeçalho do módulo */}
                    <div className="flex items-center justify-between rounded-t-2xl bg-linear-to-r from-zinc-50 to-zinc-100 px-8 py-6 dark:from-zinc-900 dark:to-zinc-800">
                      <div className="flex w-full min-w-0 items-center gap-4">
                        <CollapsibleTrigger asChild className="w-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group focus-visible:ring-primary/60 flex items-center justify-start gap-3 px-2 py-1 text-xl font-bold transition-all duration-150 hover:scale-[1.03] focus-visible:ring-2"
                          >
                            <Icon name={module.icon} className="mr-1 text-2xl" />
                            <span className="truncate">{t.module(`${module.title}`)}</span>
                            <ChevronsUpDown className="group-hover:text-primary h-5 w-5 text-zinc-400 transition" />
                          </Button>
                        </CollapsibleTrigger>
                        {/* Badges de contagem */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="ml-2 flex items-center gap-1 px-3 py-1 text-xs"
                              >
                                <PlusCircle className="mr-1 h-3 w-3" />
                                {t.plan("modules.features_count", {
                                  count: features.length,
                                })}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t.plan("modules.features_count_tooltip")}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-all duration-150 hover:scale-105"
                                onClick={() => onAddFeature(module)}
                              >
                                <PlusCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                  {t.plan("modules.add_feature")}
                                </span>
                                {/* Contador de features disponíveis para adicionar */}
                                {(() => {
                                  // Calcula quantas features podem ser adicionadas neste módulo
                                  const availableCount = (featuresByModule[module.id] || []).filter(
                                    (f: any) => !planFeaturesByFeature[f.id]
                                  ).length;
                                  return (
                                    <span className="ml-2 rounded bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500 dark:bg-zinc-800">
                                      {availableCount}
                                    </span>
                                  );
                                })()}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t.plan("modules.add_feature_tooltip")}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    {/* Conteúdo expandido do módulo */}
                    <CollapsibleContent>
                      <div className="ml-8 space-y-4 pt-3 pb-5">
                        <AnimatePresence>
                          {features.length > 0 ? (
                            features.map((feature) => {
                              const planFeature = planFeaturesByFeature[feature.id];
                              return (
                                <motion.div
                                  key={feature.id}
                                  layout
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 4 }}
                                  transition={{ duration: 0.1, ease: "easeOut" }}
                                >
                                  <div className="group flex flex-col rounded-xl border border-zinc-100 bg-zinc-50 px-6 py-4 shadow-sm transition-all duration-200 hover:bg-zinc-100 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                                    <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                                      <span className="flex items-center gap-3">
                                        {feature.icon && (
                                          <Icon
                                            name={feature.icon}
                                            className="mr-1 text-lg"
                                            size={18}
                                          />
                                        )}
                                        <span className="truncate text-base font-semibold">
                                          {t.model(`${feature.path}`)}
                                        </span>
                                      </span>
                                      {/* Badge de permissões */}
                                      {planFeature?.plan_feature_actions && (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge
                                                variant="outline"
                                                className="animate-fade-in ml-2 flex items-center gap-1 px-3 py-1 text-xs"
                                              >
                                                <Shield className="mr-1 h-3 w-3" />
                                                {planFeature.plan_feature_actions.length}{" "}
                                                {t.plan("modules.permissions")}
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              {t.plan("modules.permissions_tooltip")}
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )}
                                    </div>
                                    {/* Ações rápidas (visíveis no hover) */}
                                    <div className="flex shrink-0 items-center gap-3 opacity-80 transition-opacity group-hover:opacity-100">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              className="flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-150 hover:scale-105"
                                              onClick={() => onEditActions(module, feature)}
                                            >
                                              <Shield className="h-4 w-4" />
                                              <span className="hidden sm:inline">
                                                {t.plan("modules.edit_actions")}
                                              </span>
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            {t.plan("modules.edit_permissions_tooltip")}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              className="rounded-full px-2 py-2 text-red-500 transition-all duration-150 hover:scale-110 hover:bg-red-100 dark:hover:bg-red-900"
                                              title={t.plan("modules.remove_feature_title")}
                                              onClick={() => handleDeleteClick(planFeature)}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            {t.plan("modules.remove_feature_tooltip")}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.1, ease: "easeOut" }}
                              className="py-4 text-center text-gray-400 italic"
                            >
                              {t.plan("modules.no_features_linked")}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </ScrollArea>
      {/* Modal de confirmação de remoção */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.plan("modules.remove_feature_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.plan("modules.remove_feature_confirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t.plan("modules.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              {t.plan("modules.remove")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
