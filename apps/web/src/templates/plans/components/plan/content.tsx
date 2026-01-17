import { plan } from "@repo/types";
import { useLang } from "@repo/language/hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
  Skeleton,
} from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { FeaturesByModule } from "../../types";

export interface IPlanContent {
  isLoading: boolean;
  plan: plan;
  featuresByModule: FeaturesByModule[];
}

export const Content = ({ isLoading, plan, featuresByModule }: IPlanContent) => {
  const t = useLang();

  return (
    <ScrollArea className="h-full w-full">
      <div className="pr-2 sm:pr-4">
        {isLoading ? (
          <Skeleton className="mb-3 h-20 w-full sm:mb-4 sm:h-24" />
        ) : (
          <div className="mb-3 max-h-20 rounded-md border border-gray-200 bg-gray-50 p-2 shadow-sm sm:mb-4 sm:max-h-24 sm:p-3 dark:border-gray-700 dark:bg-gray-800/60">
            <ul className="ml-1 space-y-1.5 sm:space-y-2">
              <li className="flex items-center gap-2 truncate text-xs text-gray-700 sm:text-sm dark:text-gray-200">
                <Icon
                  name="CheckCircle"
                  className="hidden h-3 w-3 text-green-500 sm:h-4 sm:w-4 md:block"
                />
                <span>
                  {!plan.licenses
                    ? t.requirement("unlimited_licenses")
                    : t.requirement("licenses", { licenses: plan.licenses })}
                </span>
              </li>

              {!!plan?.free_test && (
                <li className="flex items-center gap-2 truncate text-xs text-gray-700 sm:text-sm dark:text-gray-200">
                  <Icon
                    name="CheckCircle"
                    className="hidden h-3 w-3 text-green-500 sm:h-4 sm:w-4 md:block"
                  />
                  <span>{t.requirement("free_test", { days: plan.free_test })}</span>
                </li>
              )}
              {plan.billing_model === "monthly" && !plan.free_test && (
                <li className="flex items-center gap-2 truncate text-xs text-gray-700 sm:text-sm dark:text-gray-200">
                  <Icon
                    name="CheckCircle"
                    className="hidden h-3 w-3 text-green-500 sm:h-4 sm:w-4 md:block"
                  />
                  <span>{t.requirement("auto_update")}</span>
                </li>
              )}

              <li className="flex items-center gap-2 truncate text-xs text-gray-700 sm:text-sm dark:text-gray-200">
                <Icon
                  name="CheckCircle"
                  className="hidden h-3 w-3 text-green-500 sm:h-4 sm:w-4 md:block"
                />
                <span>{t.requirement("change_logs")}</span>
              </li>
            </ul>
          </div>
        )}
        {featuresByModule.length === 0 && (
          <span className="text-xs text-gray-400 sm:text-sm">{t.page.plans("empty_features")}</span>
        )}
        <Accordion type="single" collapsible className="w-full" disabled={isLoading}>
          {featuresByModule.map((mod) => (
            <AccordionItem key={mod.id} value={mod.id} className="border-0">
              <AccordionTrigger className="flex items-center justify-between gap-2 text-sm text-gray-800 sm:gap-3 sm:text-base dark:text-gray-100">
                {isLoading ? (
                  <Skeleton className="h-5 w-full sm:h-6" />
                ) : (
                  <>
                    <span className="flex flex-1 items-center gap-1.5 text-xs sm:gap-2 sm:text-sm md:text-base">
                      {mod.icon && <Icon name={mod.icon} className="h-3 w-3 sm:h-4 sm:w-4" />}
                      {t.module(mod.title)}
                    </span>
                    <span className="ml-1 flex text-xs text-gray-500 sm:ml-2 dark:text-gray-400">
                      ({mod.features.length}
                      <p className="ml-1 hidden lg:flex">
                        {mod.features.length > 1
                          ? t.page.plans("features")
                          : t.page.plans("feature")}
                      </p>
                      )
                    </span>
                  </>
                )}
              </AccordionTrigger>

              <AccordionContent>
                <ul className="my-3 ml-1 space-y-1.5 sm:my-4 sm:space-y-2">
                  {mod.features.map((req, i) => {
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-1.5 truncate text-[9px] text-gray-700 sm:gap-2 sm:text-[10px] md:text-sm dark:text-gray-200"
                      >
                        <Icon
                          name="CheckCircle"
                          className="hidden h-3 w-3 text-green-500 sm:h-4 sm:w-4 md:block"
                        />
                        <span>{t.requirement(req.title)}</span>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
};
