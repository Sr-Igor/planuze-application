"use client";

import { useLang } from "@repo/language/hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Skeleton,
} from "@repo/ui";
import { Icon } from "@repo/ui/app";

export interface IResourcesProps {
  groupedFeatures: {
    module: any;
    features: {
      title: string;
    }[];
  }[];
  isLoading: boolean;
}

export const Resources = ({ groupedFeatures, isLoading }: IResourcesProps) => {
  const t = useLang();

  return (
    <div className="space-y-4 rounded-lg border-gray-200 shadow-md sm:space-y-6 dark:border-gray-800">
      <div>
        <h3 className="mb-2 pl-2 text-sm font-semibold">
          {t.page.subscription("resources.title")}
        </h3>
        <div className="space-y-4 sm:space-y-6">
          {groupedFeatures.length === 0 && (
            <span className="text-xs text-gray-400 sm:text-sm">
              {t.page.subscription("resources.empty")}
            </span>
          )}
          {groupedFeatures.length > 0 && (
            <Accordion type="single" collapsible className="w-full space-y-2">
              {groupedFeatures.map((group) => (
                <AccordionItem
                  key={group.module.id}
                  value={group.module.id}
                  className="bg-sidebar-accent/60 rounded-lg"
                >
                  <AccordionTrigger className="flex h-10 items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-bold text-gray-800 sm:h-12 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm dark:text-gray-100">
                    {isLoading ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      <>
                        <span className="flex flex-1 items-center gap-1.5 sm:gap-2">
                          {group.module.icon && (
                            <Icon
                              name={group.module.icon}
                              className="h-4 w-4 text-gray-600 max-sm:hidden sm:h-5 sm:w-5 dark:text-gray-400"
                            />
                          )}
                          {t.module(group.module.title)}
                        </span>
                        <Badge className="hidden rounded bg-transparent px-1.5 py-0.5 text-xs text-gray-800 sm:px-2 sm:text-sm md:block dark:text-gray-200">
                          {group.features.length}
                        </Badge>
                      </>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="my-3 ml-3 space-y-1.5 sm:my-4 sm:ml-5 sm:space-y-2">
                      {group.features.map((req, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-700 sm:gap-2 sm:text-[12px] dark:text-gray-200"
                        >
                          <Icon
                            name="CheckCircle"
                            className="h-3 w-3 text-green-500 max-sm:hidden sm:h-4 sm:w-4"
                          />
                          <span>{t.requirement(req.title)}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};
