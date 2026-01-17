import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { isAfter } from "date-fns";
import { AlertTriangle, ExternalLink, InfoIcon, X } from "lucide-react";

import { subscription } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Alert, AlertDescription, AlertTitle, Button } from "@repo/ui";

import { useSubscription } from "@repo/api/web/callers/subscription";
import { useAppDispatch, useAppSelector } from "@repo/redux/hook";
import { cn } from "@/lib/utils";
import { set } from "@repo/redux/store/modules/module/actions";
import { update } from "@repo/redux/store/modules/warning/actions";

export interface IWarningProps {
  type: "info" | "warning" | "error";
  title: string;
  description: string;
  subscription?: subscription;
}

export const Warning = ({ type = "info", title, description, subscription }: IWarningProps) => {
  const t = useLang();

  const router = useRouter();

  const { portal } = useSubscription({
    callbacks: {
      portal: {
        onSuccess: (data) => {
          window.location.href = data.url;
        },
      },
    },
  });

  const warningTypes = {
    info: {
      alertClass: "bg-blue-300 text-blue-800",
      titleClass: "text-blue-800",
      descriptionClass: "text-blue-800",
      icon: <InfoIcon />,
    },
    warning: {
      alertClass: "bg-yellow-300 text-yellow-800",
      titleClass: "text-yellow-800",
      descriptionClass: "text-yellow-800",
      icon: <AlertTriangle />,
    },
    error: {
      alertClass: "bg-red-300 text-red-800",
      titleClass: "text-red-800",
      descriptionClass: "text-red-800",
      icon: <AlertTriangle />,
    },
  };

  const icon = warningTypes[type].icon;

  const dispatch = useAppDispatch();
  const { all } = useAppSelector((state) => state.module);
  const { open, date } = useAppSelector((state) => state.warning);

  const onClose = () => {
    dispatch(update({ open: false, date: new Date() }));
  };

  useEffect(() => {
    const before = date ? isAfter(date, new Date()) : true;
    if (before && title) {
      dispatch(update({ open: true }));
    }
  }, []);

  return (
    <>
      {open && (
        <Alert
          variant="default"
          className={cn("flex h-[80px] items-center rounded-none", warningTypes[type].alertClass)}
        >
          <div className="flex flex-1 items-center gap-3">
            <span className="hidden lg:block">{icon}</span>
            <span className="flex flex-col gap-1">
              <AlertTitle
                className={cn("hidden text-sm font-medium lg:block", warningTypes[type].titleClass)}
              >
                {title}
              </AlertTitle>
              <AlertDescription className={cn("text-sm", warningTypes[type].descriptionClass)}>
                {description}
              </AlertDescription>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size={"sm"}
              className="hidden lg:flex"
              loading={portal.isPending}
              onClick={() => {
                const inactiveSubscription =
                  subscription?.status === "deleted" || subscription?.is_test;

                const admModule = all.find((m) => m.title === "admin");
                dispatch(set({ moduleId: admModule?.id || "" }));

                inactiveSubscription
                  ? router.push("/subscription?tab-subscription=plans")
                  : portal.mutate();
              }}
            >
              <ExternalLink />
              {t.warning("locked.manage")}
            </Button>
            <Button variant="link" size="sm" onClick={onClose}>
              <X strokeWidth={4} className={cn(warningTypes[type].titleClass)} />
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
};
