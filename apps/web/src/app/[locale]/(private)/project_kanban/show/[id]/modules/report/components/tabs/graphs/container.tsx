"use client";

import * as React from "react";

import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@repo/ui";

import { cn } from "@/lib/utils";

export interface iContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isLoading: boolean;
  isEmpty: boolean;
}

export const Container = ({
  title,
  description,
  children,
  isLoading,
  isEmpty,
}: iContainerProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn("relative", isLoading || (isEmpty && "pointer-events-none"))}>
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}

        {isEmpty && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <PackageOpen className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground text-md font-semibold">{t("report.empty")}</p>
          </div>
        )}

        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </CardContent>
    </Card>
  );
};
